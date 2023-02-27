
import {Link} from 'react-scroll/modules';
import React from "react";
import Slider from "react-slick";
import data from "./data.json";

export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 4
            }
          }
        ]
      };
  return (
    
    <div className="lg:mx-16 mx-2 ">
      {/* slider */}
        <div className="flex justify-center items-center my-20">
  <div className="md:mx-4 grid grid-cols-1 lg:grid-cols-5 gap-5 md:mt-0 mt-2">
    
   {data.map((item) =>
   <div key={item.id}className="max-w-sm bg-transpaent rounded-xl transform hover:scale-105 transition duration-500" data-aos="fade-up">
      <div className="relative">
        <img className="md:w-full md:h-full w-auto h-auto rounded-xl" src={item.image}alt="img" />
      </div>
    </div>
    )}
    </div>
    </div>
    </div>
    
  );
}











