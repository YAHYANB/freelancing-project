import React from "react";
import "./ProjectCard.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdPerson } from "react-icons/io";

function ProjectCard({ item }) {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (item.reviews.length > 0) {
      let stars = 0
      let number = 0
      item?.reviews?.map((item) => {
        stars = stars + item.rating
        number = number + 1
      })
      setStars(Math.ceil(stars / number))
    }

  }, [item])
  return (
    <Link to={`/gig/${item.id}`} className="link">
      <div className="projectCard">
        <img src={'http://127.0.0.1:8000/images/gigs/coverImages/' + item.coverImage} alt="" />
        <div className="info">
          <div className="user">
            <img src={'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} alt="" />
            <span>{item.user.fname + ' ' + item.user.lname}</span>
          </div>
          <p className="truncate-overflow overflow-ellipsis line-clamp-3">{item.shortDescription}</p>
          <div className="flex justify-between items-center">
            <div className="star my-2 flex items-center">
              {[...Array(stars)].map((_,index) =>
                <img src="./img/star.png" alt="" key={index} />
              )}
              <span className="">{stars}</span>
            </div>
            <div className="flex justify-center items-center space-x-1 opacity-70 text-sm">
              <IoMdPerson/>
              <span>{item.reviews.length}</span>
            </div>
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
