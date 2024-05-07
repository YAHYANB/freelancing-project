import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUser } from "./redux/User";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Update from "./pages/update/Update";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Payment from "./pages/payments/Payment";
import MyProfile from "./pages/myProfile/MyProfile";
import { ImSpinner2 } from 'react-icons/im';
import { fetchAllGig } from "./redux/Gigs";
import NotFound from "./components/notFound/NotFound";

function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));
  const auth = useSelector((state) => state.user?.user);
  const status = useSelector((state) => state.user?.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token)).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token, dispatch]);

  useEffect(()=> {
    dispatch(fetchAllGig())
  },[dispatch])

  useEffect(() => {
    const unlisten = navigate({
      replace: false,
    });

    return unlisten;
  }, [navigate]);

  useEffect(() => {
    setPrevLocation(location.pathname);
  }, [location]);



  if (isLoading) {
    return (
      <ImSpinner2 className='mx-auto animate-spin text-green-700 text-5xl mt-[300px]' />
    )
  }
  if (!auth) {
    return (
      <>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/myGigs" element={<MyGigs />} />
          <Route path="/myGigs/edit/:id" element={<Update />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/message/:id" element={<Message />} />
          <Route path="/add" element={<Add />} />
          <Route path="/gig/:id" element={<Gig />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/login" element={<Navigate to="/MyProfile" />} />
          <Route path="/register" element={<Navigate to="/MyProfile" />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
