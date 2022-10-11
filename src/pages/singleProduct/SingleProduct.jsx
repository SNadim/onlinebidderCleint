import './singleProduct.scss';
import axios from 'axios';
import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../components/banner/Banner';
import { Top } from '../../components/top/Top';
import { Navbar } from '../../components/navbar/Navbar';

export const SingleProduct = () => {
    const [product,setProduct] = useState([]);
    const [remaining,setRemaining] =  useState(null);
    const [days,setDays] =  useState(0);
    const [hours,setHours] =  useState(0);
    const [minutes,setMinutes] =  useState(0);
    const [seconds,setSeconds] =  useState(0);
    const descriptionSection = useRef(null);
    const loc = useLocation().pathname.split("/")[3];

    const currentStatus = (startDate, endDate)=>{
      if(Date.parse(endDate) > Date.now() && Date.parse(startDate) < Date.now()){
        return true;
      } 
    }
    useEffect(()=>{
        
        const productCall = async ()=>{
            try {
                const res = await axios.get(`https://reignmart.herokuapp.com/products/${loc}`);
                setProduct(res.data);
                setRemaining(new Date(res.data[0][0].endDate).getTime());
            } catch (error) {
                console.log(error);
            }

        }
        
        productCall();
        
    },[loc]);

    if(remaining !== null) {
        var myfunc = setInterval(function() {
            var now = new Date().getTime();
            var timeleft = remaining - now;
            if (timeleft < 0) {
                clearInterval(myfunc);
                setDays(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
                setRemaining(null);
            }
            
            setDays(Math.floor(timeleft / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((timeleft % (1000 * 60)) / 1000));
            }, 1000);
        }

        // scroll down
        const scrollDown = (ref) => {
            window.scrollTo({
              top: ref.current.offsetTop,
              behavior: 'smooth',
            });
          };

  return (
    <>
    <Banner />
    <Top />
    <Navbar />
    <div className='singleProduct'>
        {product.length > 0 &&
        <div className="container">
            <div className="wrapper">
                <div className="imageContainer">
                    <img className='mainImg' src={`https://reignmart.herokuapp.com/images/products/${product[1][0].image}`} alt="" />
                    <div className="subImg">
                        {
                            product[1].map((element,key)=>(
                                <img key={key} src={`https://reignmart.herokuapp.com/images/products/${element.image}`} alt="" />
                            ))
                        }
                        
                    </div>
                </div>

                <div className="content">
                    <h1>{product[0][0].title}</h1>
                    <div className="priceTag">
                        <div>Starting price : <span>${product[0][0].startingBidPrice}</span></div>
                        <div>Highest Bid : <span>${product[0][0].HighestBid}</span></div>
                        <div>status : <span> on going</span></div>
                        <div>Remaining : {currentStatus(product[0][0].startDate, product[0][0].endDate) && <span> {days} days : {hours} : {minutes} : {seconds} </span>}</div>
                    </div>
                    <div className="features">
                        <h3>Key Features</h3>
                        {
                            product[2].slice(0,3).map((element,key)=>(
                                <p key={key}>{element.title} :{element.description}</p>
                            ))
                        }
                        <span onClick={() => scrollDown(descriptionSection)}>More to know</span>
                    </div>
                    <div className='highestBidder'>
                        <img src="https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="" />
                        <p>Shariar Nadim</p>
                    </div>
                    <div className="bid">
                        <input type="number" placeholder='place your bid...' min={product[0][0].HighestBid} /><br />
                        <button>Bid Now</button>
                    </div>
                </div>
            </div>
            <div className='description' ref={descriptionSection}>
                <h3>Description</h3>
                <table>
                    <tbody>
                { 
                product[2].map((element,key)=>(
                    <tr key={key}><td>{element.title}</td><td>{element.description}</td></tr>
                ))
                    }
                    </tbody>
                </table>
                    
            </div>
        </div>
}
    </div>
    </>
  )
}
