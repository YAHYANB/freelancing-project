import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Payment from "./pages/payments/Payment";
import MyProfile from "./pages/myProfile/MyProfile";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IoReload } from 'react-icons/io5';

function App() {
  const auth = useSelector((i) => i.user?.user)

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={ auth  ? <Gigs /> : <Navigate to='/login' />} />
          <Route path="/myGigs" element={auth  ? <MyGigs /> : <Navigate to='/login' />} />
          <Route path="/orders" element={auth  ? <Orders /> : <Navigate to='/login' />} />
          <Route path="/messages" element={auth  ? <Messages /> : <Navigate to='/login' />} />
          <Route path="/message/:id" element={auth  ? <Message /> : <Navigate to='/login' />} />
          <Route path="/add" element={auth  ? <Add /> : <Navigate to='/login' />} />
          <Route path="/gig/:id" element={auth  ? <Gig /> : <Navigate to='/login' />} />
          <Route path="/payment" element={auth  ? <Payment /> : <Navigate to='/login' />} />
          <Route path="/MyProfile" element={auth  ? <MyProfile /> : <Navigate to='/login' />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path="*" element={'not found'} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
