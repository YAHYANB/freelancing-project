import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/User";
import "./Navbar.scss";
import { fetchLogout } from "../../redux/Auth";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('token'))
  const user = useSelector((i) => i.user);


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
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="left">
          <div className="logo">
            <Link className="link" to="/">
              <span className="text">liverr</span>
            </Link>
          </div>
          <div className="items">
            <Link>Liverr Business</Link>
            <Link>Explore</Link>
            {!user?.isSeller && <Link>Become a Seller</Link>}
            {/* <div className="searchInput">
              <IoSearchOutline size="20px" className="icon" />
              <input type="text" placeholder="Find Talent" />
            </div> */}
          </div>
        </div>

        {user?.user ? (
          <div className="user" onClick={() => setOpen(!open)}>
            <img
              src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
              alt=""
            />
            <span>{user?.user?.fname}</span>
            {open && (
              <div className="options">
                <Link className="link" to="/mygigs">
                  My Gigs
                </Link>
                <Link className="link" to="/gigs">
                  All Gigs
                </Link>
                <Link className="link" to="/add">
                  Add New Gig
                </Link>
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
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
