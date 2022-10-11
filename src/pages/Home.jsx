import React, { useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext/AuthContext';
import { logout } from '../context/authContext/apiCalls';

import { Announce } from '../components/Announce/Announce';
import { Slider } from '../components/slider/Slider';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Banner from '../components/banner/Banner';
import { Top } from '../components/top/Top';
import { Navbar } from '../components/navbar/Navbar';


export const Home = () => {
  const {dispatch} = useContext(AuthContext);

  const [featuredPost, setFeaturedPost] = useState([]);
  const [latestPost, setLatestPost] = useState([]);
  const [upcomingPost, setUpcomingPost] = useState([]);
  // const navigate = useNavigate();
  const handleLogout = async ()=> {
    logout(dispatch);
  }

  useEffect(()=>{
    const featured = async () =>{

      try {
        const res = await axios.get("http://localhost:5000/products?type=featured");
        setFeaturedPost(res.data);
      } catch (error) {
        console.log(error.message);
      }
       
    }

    const latest = async () =>{

      try {
        const res = await axios.get("http://localhost:5000/products?type=latest");
        setLatestPost(res.data);
      } catch (error) {
        console.log(error.message);
      }
       
    }

    const upcoming = async () =>{

      try {
        const res = await axios.get("http://localhost:5000/products?type=upcoming");
        setUpcomingPost(res.data);
      } catch (error) {
        console.log(error.message);
      }
       
    }

    featured();
    latest();
    upcoming();
  },[])
  return (
    <div>
      <Banner />
        <Top />
        <Navbar />
        <Announce/>
        <Slider items={featuredPost} title="Featured"/>
        <Slider items={latestPost} title="Latest"/>
        <Slider items={upcomingPost} title="Upcoming"/>
    </div>
  )
}
