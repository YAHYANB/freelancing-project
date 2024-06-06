import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoNotifications } from "react-icons/io5";
import "./Navbar.scss";
import { fetchLogout } from "../../redux/Auth";

function Navbar({ notifications, setNotifications }) {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('token'))
  const user = useSelector((i) => i.user);

  useEffect(() => {
    console.log('nav', notifications)
  }, [notifications])
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    await dispatch(fetchLogout(auth))
  }


  useEffect(() => { console.log('navbar', notifications) }, [notifications])
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="left">
          <div className="logo">
            <Link className="" to="/">
              <span className="uppercase text-md font-semibold">Swift<span className="">Gig</span></span>
            </Link>
          </div>
          {/* <div className="items">
            <Link>Liverr Business</Link>
            <Link>Explore</Link>
          </div> */}
        </div>

        {user?.user ? (
          <div className="flex space-x-8 items-center">

            <Link className="link" to="/gigs">
              All Gigs
            </Link>
            <Link className="link" to="/add">
              Add New Gig
            </Link>

            <div className="user ">

              <Link className="link" to="/orders">
                Orders
              </Link>
            </div>
            <div className="user ">
              <div className="relative">
                <IoNotifications className="" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 w-4 text-center h-4 -translate-y-1/2 block rounded-full ring-2 text-xs ring-white text-white bg-red-500">
                    {notifications.length}
                  </span>
                )}
              </div>
              <Link className="link" to="/messages">
                Messages
              </Link>
            </div>
            <div className="user pl-4" onClick={() => setOpen(!open)}>
              <img
                src={user?.user?.profileImg ? `http://127.0.0.1:8000/images/profile/${user?.user?.profileImg}` : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                alt=""
              />
              <span>{user?.user?.fname}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/mygigs">
                    My Gigs
                  </Link>


                  <Link className="link" to="/payment">
                    Payments
                  </Link>
                  <Link className="link" to="/MyProfile">
                    Profile
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="links">
            <Link className="lnk sing-in" to="/register">
              <IoEnterOutline />
              <span>Sign in</span>
            </Link>
            <Link
              className={
                active || pathname !== "/"
                  ? "link lnk join active"
                  : "link lnk join"
              }
              to="/login"
            >
              <MdOutlineCreate />
              <button>Join</button>
            </Link>
          </div>
        )}
      </div>

      {/*{(pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>|
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>|
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>|
            <Link className="link menuLink" to="/">
              AI Services
            </Link>|
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>|
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>|
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>|
            <Link className="link menuLink" to="/">
              Business
            </Link>|
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}*/}
    </div>
  );
}

export default Navbar;
