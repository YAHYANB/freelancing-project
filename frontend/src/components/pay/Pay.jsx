import React, { useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';

import { createPayment } from '../../redux/Payment';

function Pay({ gig, setModal }) {

    const token = JSON.parse(localStorage.getItem('token'));
    const dispatch = useDispatch();



    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createPayment({ token, gigData: gig }))
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 mt-2 text-center">
            <p className="ml-4 text-gray-500 mb-4">We will transfer you over to PayPal secure servers</p>
            <button className="ml-8 py-2 px-16 bg-blue-600 text-white rounded font-medium italic hover:bg-blue-700">
                <span className="text-sm font-normal pr-1.5">Pay with</span>PayPal
            </button>
        </form>
    )
}

export default Pay
