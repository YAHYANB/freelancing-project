import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './redux/Auth';
import UserSlice from './redux/User'
import GigSlice from './redux/Gigs'
import RatingSlice from './redux/Rating'
import { BrowserRouter } from 'react-router-dom';
import Payment from './redux/Payment';
import Order from './redux/Order';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    gigs: GigSlice,
    reviews: RatingSlice,
    payment: Payment,
    order: Order
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);
