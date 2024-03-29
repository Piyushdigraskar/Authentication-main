import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/Auth-Context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail.trim().length === 0) {
      return;
    }
    setIsLoading(true);
    if (isLogin) {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'content-type': 'application/json'
          }
        }
      ).then(res =>{
        if(res.ok){
          return res.json().then(data =>{
            authCtx.login(data.idToken);
            history.replace('/');
          })
        }else{
          return res.json().then((data) => {
            let errorMessage = ' failed';
            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message;
            // }
            alert(errorMessage);
          });
        }
      })

    } else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'content-type': 'application/json'
          }
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {

        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed';
            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message;
            // }
            alert(errorMessage);
          });
        }
      })
    }


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
