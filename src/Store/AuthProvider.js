import React, { useState } from "react";

import AuthContext from "./Auth-Context";

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    //This here will return true if token is there and return false if token is empty
    const userLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
        setTimeout(() => {
            logoutHandler();
            // Show alert after 1 minute
            alert("Your token has expired. Please log in again.");
        }, 1 * 60 * 1000); // 1 minute in milliseconds

    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
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