import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__items">
        <span>All</span>
        <span>Electronics</span>
        <span>Mobiles</span>
        <span>Sports, fitness, outdoor</span>
        <span>Home&Kitchen</span>
        <span>Amazon Pay</span>
        <span>Best sellers</span>
        <span>COVID-19 care</span>
        <span>users's Amazon.in</span>
      </div>
      <div className="navbar__items">
        <img
          className="navbar__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/acquisition/amazon_video_light._SY32_FMpng_.png"
          alt="prime-offer"
        />
      </div>
    </div>
  );
};

export default Navbar;
