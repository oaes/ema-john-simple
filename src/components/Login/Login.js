import React from 'react';
import Auth from '../Login/UseAuth';

const Login = () => {
   const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
           window.location.pathname='/review';
        })
    }
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname='/';
        })
    }
    return (
        <div>
            <h1>hello kitty</h1>
       { 
       auth.user ? <button onClick={handleSignOut}>sign out</button> :
       <button onClick={handleSignIn}>sign in</button>
       }
        </div>
    );
};

export default Login;