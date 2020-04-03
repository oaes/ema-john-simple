import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
// import { useContext } from 'react';
// import { UserContext } from '../../App';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/UseAuth';


const usePrevious = value => {
    const previous = useRef();
    useEffect(() => {
        console.log(value);
        previous.current = value;
    }, [value])
    return previous.current;
}



const Header = () => {
    const auth = useAuth();
    // console.log(auth.user);
    return (
        <div className="header">
           <img src={logo} alt=""/>
          <nav>
              <a href="/shop">Shop</a>
              <a href="/review">Order Review</a>   
              <a href="/inventory">Inventory</a>
             { 
             auth.user &&<span style={{color:'lime'}}>{auth.user.name}</span>
             }
             {
                 auth.user ? <a href='/login'>
                 <button>log out</button>
             </a> : <a href='/login'>
                 <button>log in</button>
             </a>
             }
          </nav>
        </div>
    );
};

export default Header;