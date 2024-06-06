import React from "react";
import "./Featured.scss";
import categories from '../../categories.json'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Featured({search, setSearch}) {
  const location = useNavigate()
  const handleSubmit = () => {
    location('/gigs')
  } 
  return (
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
              <input type="text" placeholder='What are you looking for ?' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular Searches</span>
            <div className="">
              {categories.filter((i, inx) => inx < 5).map((i, inx) => (
                <Link to={`/gigs/${i.name}`}
                  className="text-xs leading-7 font-system-ui bg-white bg-opacity-15 rounded-full px-4 mx-1 py-0 border border-white border-opacity-15 transition-transform duration-600 hover:scale-110 hover:opacity-100"
                  key={inx}
                >
                  {i.name}
                </Link>
              ))}
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
