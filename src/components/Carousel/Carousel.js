import React, { useEffect, useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Carousel.css";
import { noPicture } from '../../config/config';
import { img_300 } from '../../config/config';
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios'

const handleDragStart = (e) => e.preventDefault()

const Carousel = ({ media_type , id}) => {

    const [ credits, setCredits] = useState();

    const items = credits?.map((c) => (
        <div className='carouselItem'>
            <img  
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt= {c.name}
                onDragStart ={handleDragStart}
                className='carouselItem_img' 
                />
            <b className='carouselItem_text' >{c.name}</b>
        </div>
    ))

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const fetchCredits = async() => {
        const {data} = await axios.get(
    `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        setCredits(data.cast)
    }

    useEffect(()=> {
        fetchCredits()
    },[])
    return (
        <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay />
    );
}

// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

export default Carousel
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>