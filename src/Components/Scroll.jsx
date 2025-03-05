import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Slider from 'react-slick';
import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

const Scroll = () => {
const [images,setImages]=useState([])
const {imageData}=useApi();
// console.log(imageData);

useEffect(()=>{
  if(imageData?.length){
    const x=imageData.map((item)=>item.url);
    setImages(x)

    
  }
},[imageData])
  
  const settings = {
    dots: true,
    infinite: true, // Looping infinite
    speed: 500, // Slide animation speed
    autoplay: true, // Automatic scrolling
    autoplaySpeed: 2000, // 2 seconds delay
    slidesToShow: 1, // Only one image per view
  };

  return (
    <div className="overflow-hidden">   
     <div className="px-[.2rem] overflow-hidden">
    <Slider {...settings}  >
     {
        images?.map((item,index)=>{
            return <img src={item} key={index} alt="img not available" className=" rounded-md" />
        })
     }
    </Slider>
    </div>
    </div>

  );
};

export default Scroll; 
