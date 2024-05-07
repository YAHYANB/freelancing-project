import "./Gig.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdArrowBack } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowGig } from "../../redux/Gigs";
import { Navigate, useParams } from "react-router-dom";
import { ImSpinner2 } from 'react-icons/im';
import Rating from '../../components/rating/Rating'
import Modal from '../../components/modal/Modal'
import { fetchDeleteRating, fetchRating } from "../../redux/Rating";
import NotFound from "../../components/notFound/NotFound";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

function Gig() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'));
  const user = useSelector((state) => state.user?.user);
  const gig = useSelector((state) => state.gigs?.gig.gig);
  const status = useSelector((state) => state.reviews?.status);
  const reviews = useSelector((state) => state.reviews?.reviews.reviews);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewId, setReviewId] = useState(null);
  const [stars, setStars] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (id) {
      const data = {
        token, id
      }
      Promise.all([
        dispatch(fetchShowGig(data)),
        dispatch(fetchRating(data))
      ]).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false)
    }

  }, [token, id])

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
    console.log(stars)

  }, [stars])

  const handleDeleteGig = async (review_id) => {
    setReviewId(review_id)
    const req = {
      id: review_id, token
    }
    const response = await dispatch(fetchDeleteRating(req))
    if (response.payload.status === 200) {
      window.location.href = `/gig/${id}`
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
  // window.scrollTo(0, 0);
  return (

    <div className="gig py-10 ">
      <div className="container px-10">
        <div className="left">
          {/* <span className="breadcrumbs">Liverr {'>'} Graphics & Design {'>'}</span> */}
          <h1 className="uppercase my-3">{gig.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={"https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
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
                src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="info">
                <span>{gig.user.fname + ' ' + gig.user.lname}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
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
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                My name is Anna, I enjoy creating AI generated art in my spare
                time. I have a lot of experience using the AI program and that
                means I know what to prompt the AI with to get a great and
                incredibly detailed result.
              </p>
            </div>
          </div>
          <div className="reviews">
            <div className="flex justify-between items-center pb-12">
              <h2 className="uppercase text-lg">Reviews</h2>
              {!modal &&
                <button className="bg-[#1dbf73] text-white px-4 py-1  w-[130px] rounded-sm hover:opacity-85" onClick={() => setModal(!modal)}>
                  Add Review
                </button>}
            </div>
            <Modal isOpen={modal} onClose={() => setModal(false)}>
              {modal && <Rating gig={gig} setModal={setModal} />}
            </Modal>

            {reviews && reviews.map((item) =>
              <div className="item">
                <div className="flex justify-between items-center">
                  <div className="user">
                    <img
                      className="pp"
                      src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
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
                    </div>}
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
            <div className="packsDiv" onClick={() => changePack(2)}>
              <h2>Standard</h2>
              <div className={toggleClassName === 2 ? 'actve-line' : 'line'}></div>
            </div>
            <div className="packsDiv" onClick={() => changePack(3)}>
              <h2>Premium</h2>
              <div className={toggleClassName === 3 ? 'actve-line' : 'line'}></div>
            </div>
          </div>
          <div className="packages">
            <div className={toggleClassName === 1 ? 'active-div' : 'hidde'}>
              <div className="price">
                <h3>1 AI generated image</h3>
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
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
