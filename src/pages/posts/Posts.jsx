import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../components/banner/Banner';
import { Navbar } from '../../components/navbar/Navbar';
import { Post } from '../../components/post/Post';
import { Top } from '../../components/top/Top';
import './posts.scss';

export const Posts = () => {
  const loc = useLocation().pathname.split("/")[3];
  const [post, setPost] = useState([]);
  useEffect(()=>{
    const getPost = async () =>{
      try {
        const res = await axios.get(`https://reignmart.herokuapp.com/products?type=${loc}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    getPost();
  },[loc])
  return (
    <>
    <Banner />
    <Top />
    <Navbar />
    <div className='posts'>
      <div className="container">
      {
        post.map((element, key)=>(
          <Post key={key} post={element} />
        ))
      }

      </div>
      
    </div>
    </>
  )
}
