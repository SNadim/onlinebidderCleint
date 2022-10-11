import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import "./authentication.scss";
import { useNavigate,Link } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../context/authContext/AuthContext"
import { login } from '../../context/authContext/apiCalls';
import { useCookies } from "react-cookie";

export const Login = () => {

    const [err,setErr] = useState(null);
    const[user,setUser] = useState(null);
    const {isFetching, dispatch} = useContext(AuthContext);
    const [,setCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        login({email, password}, dispatch);
        setCookie('jwt',"cookie",{
            maxAge: 86400000,
        });
        navigate("/",{replace: true});

    }

  return (
    <div className="authentication">
        <h3 className='logo'>OnlineBidder</h3>
    <div className='formContainer'>
        <div className="formWrapper">
            <span>Sign in to OnlineBidder or create an account</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button disabled={isFetching}>Sign in</button>
                {err && <p>Something went wrong</p>}
            </form>
            <Link className='link' to="/seller/login">Sign in as seller</Link>
        </div>

    </div>
    </div>
  )
}
