import React from "react";
import "./Slide.scss";
import { MdArrowBack } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Slide = ({ children, slidesToShow, slidesToScroll}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow : <IoArrowForward clasName="nextArrow" />,
    prevArrow : <MdArrowBack clasName="prevArrow" />
  };
  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings} settings={settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
