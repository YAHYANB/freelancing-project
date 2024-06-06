import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import io from 'socket.io-client'
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Payment from "./pages/payments/Payment";
import MyProfile from "./pages/myProfile/MyProfile";
import { ImSpinner2 } from 'react-icons/im';
import { fetchAllGig } from "./redux/Gigs";
import NotFound from "./components/notFound/NotFound";
import { getUser } from "./pages/message/chatRequests";
import Profile from "./pages/profile/Profile";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
  const auth = useSelector((state) => state.user?.user);
  const status = useSelector((state) => state.user?.status);
  const navigate = useNavigate();
  const [search, setSearch] = useState('')
  // const [prevLocation, setPrevLocation] = useState(location.pathname);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token)).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(fetchAllGig())
  }, [dispatch]);

  // useEffect(() => {
  //   setPrevLocation(location.pathname);
  // }, [location]);

  const addNotification = async (sender_id) => {
    try {
      const senderInfo = await getUser(sender_id); // Fetch sender's information
      setNotifications((prevNotifications) => {
        const existingNotification = prevNotifications.find(
          (notification) => notification.sender_id === sender_id
        );
        if (existingNotification) {
          return prevNotifications.map((notification) =>
            notification.sender_id === sender_id
              ? { ...notification, count: notification.count + 1, senderName: senderInfo.fname }
              : notification
          );
        } else {
          return [...prevNotifications, { sender_id, senderName: senderInfo.fname, count: 1 }];
        }
      });
    } catch (error) {
      console.error("Error fetching sender information:", error);
    }
  };

  // Connect to Socket.io
  useEffect(() => {
    if (auth) {
      socket.current = io("ws://localhost:8800");
      socket.current.emit("new-user-add", auth.id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      socket.current.on("recieve-message", (data) => {
        setReceivedMessage(data);
        addNotification(data.sender_id); // Call addNotification when receiving a new message
      });
    }
  }, [auth]);

  if (isLoading) {
    return (
      <ImSpinner2 className='mx-auto animate-spin text-green-700 text-5xl mt-[300px]' />
    );
  }

  if (!auth) {
    return (
      <>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
            <Route path="/gigs/:name?" element={<Gigs searchHome={search} setSearchHome={setSearch} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="app">
        <Navbar notifications={notifications} setNotifications={setNotifications} />
        <Routes>
          <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
          <Route path="/gigs/:name?" element={<Gigs searchHome={search} setSearchHome={setSearch} />} />
          <Route path="/myGigs" element={<MyGigs />} />
          <Route path="/myGigs/edit/:id" element={<Update />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route path="/messages" element={<Message notifications={notifications} socket={socket} receivedMessage={receivedMessage} setReceivedMessage={setReceivedMessage} onlineUsers={onlineUsers} setNotifications={setNotifications} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/gig/:id" element={<Gig />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Navigate to="/MyProfile" />} />
          <Route path="/register" element={<Navigate to="/MyProfile" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
