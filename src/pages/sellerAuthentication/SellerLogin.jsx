import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import "./authentication.scss";
import { useNavigate,Link } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../context/authContext/AuthContext"
import { sellerLogin } from '../../context/authContext/apiCalls';
import { useCookies } from "react-cookie";

export const SellerLogin = () => {

    const [err,setErr] = useState(null);
    const[user,setUser] = useState(null);
    const {isFetching, dispatch} = useContext(AuthContext);
    const [,setCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
       sellerLogin({email, password}, dispatch)
       .then((result)=>{
        if(result) {
            setCookie('jwt',"cookie",{
                maxAge: 86400000,
            });
            navigate("/seller",{replace: true});
        }
       }
       )
       .catch((err)=>console.log(err))

    }

  return (
    <div className="authentication">
        <h3 className='logo'>OnlineBidder</h3>
    <div className='formContainer'>
        <div className="formWrapper">
            <span>Sign in to OnlineBidder as a seller or create an account</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button disabled={isFetching}>Sign in</button>
                {err && <p>Something went wrong</p>}
            </form>
        </div>
    </div>
    </div>
  )
}
