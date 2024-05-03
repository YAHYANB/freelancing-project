import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={'http://127.0.0.1:8000/images/gigs/coverImages/'+item.coverImage} alt="" />
        <div className="info">
          <div className="user">
            <img src={'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} alt="" />
            <span>{item.user.fname + ' ' +item.user.lname}</span>
          </div>
          <p className="truncate-overflow overflow-ellipsis line-clamp-3">{item.shortDescription}</p>
          <div className="star my-2">
            <img src="./img/star.png" alt="" />
            <span>{item.star || 5}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup></sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
