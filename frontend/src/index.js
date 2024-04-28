import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import  AuthSlice  from './redux/Auth';
import UserSlice from './redux/User'

const store = configureStore({
  reducer:{
    auth: AuthSlice,
    user: UserSlice
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
