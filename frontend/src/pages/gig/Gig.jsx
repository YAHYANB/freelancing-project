import "./Gig.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdArrowBack } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGig, fetchShowGig } from "../../redux/Gigs";
import { Link, Navigate, useParams } from "react-router-dom";
import { ImSpinner2 } from 'react-icons/im';
import Rating from '../../components/rating/Rating'
import Modal from '../../components/modal/Modal'
import { fetchDeleteRating, fetchRating } from "../../redux/Rating";
import NotFound from "../../components/notFound/NotFound";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { fetchAddChat } from "../message/chatRequests";
import Pay from "../../components/pay/Pay";
import { format } from 'timeago.js'

function Gig() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'));
  const user = useSelector((state) => state.user?.user);
  const gig = useSelector((state) => state.gigs?.gig.gig);
  const gigs = useSelector((i) => i.gigs?.gigs.gigs);
  const status = useSelector((state) => state.reviews?.status);
  const reviews = useSelector((state) => state.reviews?.reviews.reviews);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewId, setReviewId] = useState(null);
  const [stars, setStars] = useState(null);
  const [userStars, setUserStars] = useState(null);
  const [modal, setModal] = useState(false);
  const [review, setReview] = useState([]);
  const [allGigs, setAllGigs] = useState([]);

  useEffect(() => {
    if (id) {
      const data = {
        token, id
      }
      Promise.all([
        dispatch(fetchShowGig(data)),
        dispatch(fetchRating(data)),
        dispatch(fetchAllGig())
      ]).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false)
    }

  }, [token, id])

  useEffect(() => {
    setReview(reviews)
    console.log(reviews)
  }, [reviews])

  useEffect(() => {
    let stars = 0
    let number = 0
    reviews?.map((item) => {
      stars = stars + item.rating
      number = number + 1
    })
    setStars(Math.ceil(stars / number))
  }, [reviews])

  useEffect(() => {
    if (gigs && allGigs) {
      let totalStars = 0;
      let totalReviews = 0;

      allGigs.forEach(gig => {
        gig.reviews.forEach(review => {
          totalStars += review.rating;
          totalReviews += 1;
        });
      });

      const averageStars = totalReviews ? (totalStars / totalReviews).toFixed(0) : 0;
      setUserStars(averageStars);
    }
  }, [gigs, allGigs]);

  useEffect(() => {
    setAllGigs(gigs?.filter((i) => parseInt(i.user_id) === parseInt(id)))
  }, [gigs])

  const handleDeleteGig = async (review_id) => {
    setReviewId(review_id);
    const req = {
      id: review_id,
      token
    }
    const response = await dispatch(fetchDeleteRating(req));
    if (response.payload.status === 200) {
      setReview(review.filter(i => i.id !== review_id));
      setReviewId(null);
    }
  }



  const [toggleClassName, setToggleClasName] = useState(1)
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <IoArrowForward clasName="nextArrow" />,
    prevArrow: <MdArrowBack clasName="prevArrow" />
  };

  const changePack = (num) => {
    setToggleClasName(num)
  }
  if (isLoading) {
    return (
      <ImSpinner2 className='mx-auto animate-spin text-green-700 text-5xl my-[300px]' />
    )
  }
  if (!gig) {
    return <NotFound />
  }


  const addChat = async () => {
    try {
      const data = {
        sender_id: user.id, receiver_id: gig.user_id
      }
      const response = await fetchAddChat(data)
      if (response.data.status === 200) {
        window.location.href = '/messages'
      }

    } catch (err) {
      console.log(err)
    }
  }
  // window.scrollTo(0, 0);
  return (

    <div className="gig py-10 ">
      <div className="container px-10">
        <div className="left">
          {/* <span className="breadcrumbs">Liverr {'>'} Graphics & Design {'>'}</span> */}
          <h1 className="uppercase my-3">{gig.title}</h1>
          <Link to={'/profile/' + gig.user_id}>
            <div className="user">
              <img
                className="pp"
                src={gig.user.profileImg ? `http://127.0.0.1:8000/images/profile/${gig.user.profileImg}` : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                alt=""
              />
              <span>{gig.user.fname + ' ' + gig.user.lname}</span>

              <div className="stars">
                {stars && [...Array(stars)].map((_, index) =>
                  <img src="/img/star.png" alt="" key={index} />
                ) || null}
                <span>{stars || 0}</span>
              </div>

            </div>
          </Link>

          <Slider {...settings} className='slide'>
            {gig.images.map((item, index) =>
              <img
                className="slide-img rounded-sm w-40 h-[30rem] object-cover"
                src={`http://127.0.0.1:8000/images/gigs/images/${item.image}`}
                alt=""
                key={index}
              />
            )}
          </Slider>
          <h2 className="uppercase text-lg">About This Gig</h2>
          <p>
            {gig.description}
          </p>
          <div className="seller">
            <h2 className="uppercase text-lg">About The Seller</h2>
            <div className="user">
              <img
                src={gig.user.profileImg ? `http://127.0.0.1:8000/images/profile/${gig.user.profileImg}` : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                alt=""
              />
              <div className="info">
                <span>{gig.user.fname + ' ' + gig.user.lname}</span>
                <div className="stars">
                {userStars && [...Array(parseInt(userStars))].map((_, index) =>
                  <img src="/img/star.png" alt="" key={index} />
                ) || null}
                  <span>{userStars}</span>
                </div>
                {
                  parseInt(gig.user_id) !== parseInt(user.id) ?
                    <button onClick={addChat}>
                      Contact Me
                    </button>
                    :
                    <Link to={`/MyProfile`} className="uppercase border border-gray-700 rounded-md text-sm px-4 py-2">
                      Edit Profile
                    </Link>
                }
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{gig.user.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">{format(gig.user.created_at)}</span>
                </div>
                <div className="item">
                  <span className="title">First delivery</span>
                  <span className="desc">{format(allGigs[0].created_at)}</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">{format(allGigs[allGigs.length - 1].created_at)}</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {gig.user.bio}
              </p>
            </div>
          </div>
          <div className="reviews">
            <div className="flex justify-between items-center pb-12">
              <h2 className="uppercase text-lg">Reviews</h2>
              {modal !== 'rating' && gig.user_id !== user.id &&
                <button className="bg-[#1dbf73] text-white px-4 py-1  w-[130px] rounded-sm hover:opacity-85" onClick={() => setModal('rating')}>
                  Add Review
                </button>}
            </div>
            <Modal isOpen={modal === 'rating'} onClose={() => setModal(false)}>
              {modal === 'rating' && <Rating gig={gig} setModal={setModal} setReview={setReview} review={review} id={id} />}
            </Modal>

            {reviews && review.map((item) =>
              <div className="item">
                <div className="flex justify-between items-center">
                  <div className="user">
                    <img
                      className="pp"
                      src={item.user.profileImg ? `http://127.0.0.1:8000/images/profile/${item?.user?.profileImg}` : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                      alt=""
                    />
                    <div className="info">
                      <span>{item.user.fname + ' ' + item.user.lname}</span>
                      <div className="country">
                        <span>{item.user.country}</span>
                      </div>
                    </div>
                  </div>
                  {item.user.id === user.id &&
                    <div>
                      {status === 'loading' && reviewId === item.id ?
                        <ImSpinner2 className='mx-auto animate-spin text-black text-sm ' />
                        :
                        <button onClick={() => handleDeleteGig(item.id)}>
                          <svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><line x1="8.06" y1="8.06" x2="55.41" y2="55.94" /><line x1="55.94" y1="8.06" x2="8.59" y2="55.94" /></svg>
                        </button>

                      }
                    </div>
                  }
                </div>

                <div className="stars flex items-center justify-start">

                  {[...Array(item.rating)].map((_, index) =>
                    <img src="/img/star.png" alt="" key={index} />
                  )
                  }
                  <span>{item.rating}</span>
                </div>
                <p>
                  {item.comment}
                </p>
                <div className="helpful">
                  <span>Helpful?</span>
                  <BiLike className="cursor-pointer" />
                  {/* <img src="/img/like.png" alt="" /> */}
                  <span>Yes</span>
                  <BiDislike className="cursor-pointer" />
                  {/* <img src="/img/dislike.png" alt="" /> */}
                  <span>No</span>
                </div>
              </div>
            )}
            <hr />

          </div>
        </div>
        <div className="right">
          <div className="packs">
            <div className="packsDiv" onClick={() => changePack(1)}>
              <h2>Simple</h2>
              <div className={toggleClassName === 1 ? 'actve-line' : 'line'}></div>
            </div>
            <div className="packsDiv opacity-60">
              <h2>Standard</h2>
              <div className={toggleClassName === 2 ? 'actve-line' : 'line'}></div>
            </div>
            <div className="packsDiv opacity-60">
              <h2>Premium</h2>
              <div className={toggleClassName === 3 ? 'actve-line' : 'line'}></div>
            </div>
          </div>
          <div className="packages">
            <div className={toggleClassName === 1 ? 'active-div' : 'hidde'}>
              <div className="price">
                <h3>{gig.title}</h3>
                <h2>$ {gig.price}</h2>
              </div>
              <p>
                {gig.shortDescription}
              </p>
              <div className="details mb-2">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{gig.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>{gig.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {gig.features.map(ftr => (
                  <div className="item">
                    <img src="/img/greencheck.png" alt="" />
                    <span>{ftr.feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={toggleClassName === 2 ? 'active-div' : 'hidde'}>
              <div className="price">
                <h3>2 AI generated image</h3>
                <h2>$ 59.99</h2>
              </div>
              <p>
                I will create a unique high quality AI generated image based on a
                description that you give me
              </p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>2 Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>3 Revisions</span>
                </div>
              </div>
              <div className="features">
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Prompt writing</span>
                </div>
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Artwork delivery</span>
                </div>
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Image upscaling</span>
                </div>
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Additional design</span>
                </div>
              </div>
            </div>
            <div className={toggleClassName === 3 ? 'active-div' : 'hidde'}>
              <div className="price">
                <h3>3 AI generated image</h3>
                <h2>$ 59.99</h2>
              </div>
              <p>
                I will create a unique high quality AI generated image based on a
                description that you give me
              </p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>2 Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>3 Revisions</span>
                </div>
              </div>
              <div className="features">
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Prompt writing</span>
                </div>
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Artwork delivery</span>
                </div>
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Image upscaling</span>
                </div>
                <div className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>Additional design</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setModal('pay')}>Continue</button>
        </div>
        <Modal isOpen={modal === 'pay'} onClose={() => setModal(false)}>
          {modal === 'pay' && <Pay gig={gig} setModal={setModal} />}
        </Modal>
      </div>
    </div>
  );
}

export default Gig;
