import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddRating, fetchRating } from '../../redux/Rating';
import { ImSpinner2 } from 'react-icons/im'

function Rating({ gig, setModal, setReview, review, id }) {
    const user = useSelector((state) => state.user?.user);
    const token = JSON.parse(localStorage.getItem('token'));
    const [rating, setRating] = useState(0);
    const status = useSelector((state) => state.reviews?.status);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleRatingClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmit = async () => {
        const req = {
            data: { gig_id: gig.id, user_id: user.id, rating, comment },
            token
        }
        const response = await dispatch(fetchAddRating(req))

        if (response.payload.status === 201) {
            setModal(false);
            const data = {
                token,id
            }
            // setReview([...review, { id: Date.now(), gig_id: gig.id, user_id: user.id, rating, comment, user }]);
            await dispatch(fetchRating(data))
            console.log('woooooooork')
        }
    }

    return (
        <div className='space-y-6 p-4 text-center'>
            <div className='flex justify-start items-center space-x-5'>
                <img
                    src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                    className="rounded-full w-16 h-16 object-cover"
                />
                <div className='flex flex-col space-y-1 justify-start items-start'>
                    <div>{user.fname + ' ' + user.lname}</div>
                    <div className='text-gray-700'>
                        Reviews are public and include your account and device info.
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {[...Array(5)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleRatingClick(index)}
                        className={`text-5xl px-4 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                ))}
            </div>
            <div>
                <textarea name="" id="" cols="50" rows="1" value={comment} onChange={(e) => setComment(e.target.value)} className='border-2 border-gray-400 p-5 rounded-md focus:outline-none focus:border-yellow-500' placeholder='Describe your experience'></textarea>
            </div>
            {status === 'loading' || !comment ?
                <button className="bg-[#1dbf73] text-white px-4 py-2 opacity-75  w-[130px] rounded-sm " disabled type="button" >
                    Send
                </button>
                :
                <button className="bg-[#1dbf73] text-white px-4 py-2  w-[130px] rounded-sm hover:opacity-85" onClick={handleSubmit}>
                    Send
                </button>
            }
        </div>
    )
}

export default Rating
