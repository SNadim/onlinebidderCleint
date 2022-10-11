import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './post.scss';

export const Post = ({post}) => {
  const [status,setStatus] = useState("");
  const currentStatus = ()=>{
    if(Date.parse(post[0].endDate) > Date.now() && Date.parse(post[0].startDate) < Date.now()){
      setStatus("Bidding is On Going");
    } else if(Date.parse(post[0].endDate) < Date.now()) {
      setStatus("Bidding is closed");
    } else {
      setStatus("Bidding is upcoming");
    }
  }
  useEffect(()=>{
    currentStatus();
  },[]);
  return (
    <div className='postCard'>
        <div className="wrapper">
          <div className="imageContainer">
            <div className="tag"><span>{status}</span></div>
            <img src={`https://reignmart.herokuapp.com/images/products/${post[0].image}`} alt="" />
          </div>
          <div className="content">
            <h4><Link className='link' to={`/posts/singleProduct/${post[0].productID}`}>{post[0].title}</Link></h4>
            <span>Starting Price : ${post[0].startingBidPrice}</span>
            <span>Highest Bid : ${post[0].HighestBid
}</span>
          </div>
        </div>
    </div>
  )
}
