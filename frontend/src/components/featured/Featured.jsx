import React from "react";
import "./Featured.scss";

function Featured() {
  return (
    // <div className="featured">
    //   <div className="container">
    //       <h1>
    //         Find the perfect freelance services for your business
    //       </h1>
    //       <div className="search">
    //         <button className="btn1">Find Talent</button>
    //         <button className="btn2">Post Job</button>
    //       </div>
    //       <div className="popular">
    //         <span>Popular:</span>
    //         <button>Web Design</button>
    //         <button>WordPress</button>
    //         <button>Logo Design</button>
    //         <button>AI Services</button>
    //       </div>
    //   </div>    
    // </div>
    <div className="featured">
    <div className="container">
      <div className="left">
        <h1>
          Freelance Services For <br /> Your Business
        </h1>
        <span>Millions of people use this site to turn their ideas into reality.</span>
        <div className="search">
          <div className="searchInput">
            <img src="./img/search.png" alt="" />
            <input type="text" placeholder='What are you looking for ?' />
          </div>
          <button>Search</button>
        </div>
        <div className="popular">
          <span>Popular Searches</span>
          <div>
            <button className="tag-btn">Web Design</button>
            <button className="tag-btn">WordPress</button>
            <button className="tag-btn">Logo Design</button>
            <button className="tag-btn">AI Services</button>
          </div>
        </div>
      </div>
      <div className="right">
        <img src="cute.png" alt="" />
      </div>
    </div>
  </div>
  );
}

export default Featured;
