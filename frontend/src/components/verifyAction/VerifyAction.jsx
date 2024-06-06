import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchUser } from '../../redux/User';

function VerificationAction({ orderId, setModal, mssg, submit }) {
    const user = useSelector((state) => state.user?.user);

    const token = JSON.parse(localStorage.getItem('token'));
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(submit(orderId))
        setModal(false)
    }
    useEffect(() => {
        dispatch(fetchUser(token))
    }, [dispatch, orderId])

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <p className="text-gray-500 mb-4 ml-5">Are you sure about continue <span className='font-semibold'>{mssg}</span> the order !</p>
            <div className='flex justify-center gap-4'>
                <button type='submit' className="py-2 px-16 bg-green-600 text-white rounded font-medium italic hover:bg-green-700">Yes</button>
                <button onClick={() => setModal(false)} className="py-2 px-16 bg-red-600 text-white rounded font-medium italic hover:bg-red-700">No</button>
            </div>
        </form>
    )
}

export default VerificationAction
