import React from "react";
import "./ProjectCard.scss";
import { Link } from "react-router-dom";

function ProjectCard({ item }) {
  return (
    <Link to="/gig/123" className="link">
    <div className="projectCard">
      <img src={item.img} alt=""/>
      <div className="info">
        <div className="user">
          <img src={item.pp} alt="" />
          <span>{item.username}</span>
        </div>
        <p>{item.desc}</p>
        <div className="star">
          <img src="./img/star.png" alt="" />
          <span>{item.star}</span>
        </div>
      </div>
      <hr />
      <div className="detail">
        <img src="./img/heart.png" alt="" />
        <div className="price">
          <span>STARTING AT</span>
          <h2>
            $ {item.price}
            <sup>99</sup>
          </h2>
        </div>
      </div>
    </div>
  </Link>
    // <div className="projectCard">
    //   <img src={card.img} alt="" />
    //   <div className="info">
    //     <img src={card.pp} alt="" />
    //     <div className="texts">
    //       <h2>{card.cat}</h2>
    //       <span>{card.username}</span>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ProjectCard;
