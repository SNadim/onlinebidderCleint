import './slider.scss';
import Carousel from 'react-material-ui-carousel';
import { useState } from 'react';

export const Slider = ({items,title}) => {
  return (
    <div className="slider">
        <h3>{title} Auctions</h3>
            <Carousel>
                {
                    items.map((item) => (
                        <div className="item" key={item[0].productID}>
                            <div className="imageContainer">
                                <img src={`https://reignmart.herokuapp.com/images/products/${item[0].image}`} alt="" />
                            </div>
                            <div className="infoContainer">
                                <h1>{item[0].title}</h1>
                                <p>{item[0].description}</p>
                            </div>
                        </div>
                    ))
                }
                </Carousel>

    </div>
            
  )
}
