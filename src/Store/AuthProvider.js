import React, { useState } from "react";
import AuthContext from "./Auth-Context";

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    //This here will return true if token is there and return false if token is empty
    const userLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    };

    const logoutHandler = () => {
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthProvider;