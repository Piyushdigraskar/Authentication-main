import { useRef, useContext } from 'react';
import AuthContext from '../../Store/Auth-Context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event)=>{
    event.preventDefault();
    const newEnteredPassword = newPasswordInputRef.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`,{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:newEnteredPassword,
        returnSecureToken:false
      }),
      headers:{
        'content-type':'application/json'
      }
    }).then(res =>{
      
    })

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
