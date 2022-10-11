import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import "./authentication.scss";


export const SellerRegistration = () => {

    const [err,setErr] = useState(null);
    const[user,setUser] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErr(null);
            const firstName = e.target[0].value;
            const lastName = e.target[1].value;
            const email = e.target[2].value;
            const password = e.target[3].value;
            const res = await axios.post("https://reignmart.herokuapp.com/register",{firstName,lastName,email, password});
            console.log(res.data);
        } catch (error) {
            console.log(error);
            setErr(error.response);
        }

    }

  return (
    <div className="authentication">

<h3 className='logo'>OnlineBidder</h3>
    <div className='formContainer'>
        <div className="formWrapper">
            <span>Sign up to OnlineBidder or login here</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='First name' />
                <input type="text" placeholder='Last name' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <p>By creating account, you agree to our User<br/>
                Agreement and acknowledge reading our User Privacy<br/>
                Notice.</p>
                <button>Create account</button>
                {err && <p>Something went wrong</p>}
            </form>
        </div>
        <div className='or'><span>or</span></div>
        <div className='socialMedia'>
            <div className='icon'>Continue with Google</div>
            <div className='icon'>Continue with Facebook</div>
            <div className='icon'>Continue with Apple</div>
        </div>
    </div>
    </div>
  )
}
