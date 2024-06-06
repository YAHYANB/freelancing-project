import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchAddRating } from '../../redux/Rating';
import { ImSpinner2 } from 'react-icons/im'
import { fetchShowGig } from '../../redux/Gigs';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../redux/User';
import { FetchWithDraw } from '../../redux/Payment';

function Verification({ setModal }) {
    const user = useSelector((state) => state.user?.user);

    const token = JSON.parse(localStorage.getItem('token'));
    const verification = useSelector((state) => state.user.message);
    const message = useSelector((state) => state.payment.message);
    const dispatch = useDispatch();
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isSecondtStep, setIsSecondStep] = useState(true);
    const [isAlert, setIsAlert] = useState(false);
    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSub = async (e) => {
        e.preventDefault()
        await dispatch(verifyUser({ token, formData }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(FetchWithDraw({ token, formData }))
        setIsSecondStep(false);
        setIsAlert(true);
    }
    useEffect(() => {
        if (verification?.message === 'next') {
            setIsFirstStep(false)
            setIsSecondStep(true)
            setFormData({})
        }
    },[dispatch, verification?.message])

    return (
        <>
            {isFirstStep &&
                <>
                    <form onSubmit={handleSub} class="max-w-sm mx-auto">
                        <p>Please vérify it's you entering your password</p>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                            <input type="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required
                                onChange={handleChange} />
                                 {verification && <p className="text-red-500 text-xs px-1 italic">{verification.message}</p>}
                        </div>
                        <button type='submit' class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">next</button>
                    </form>
                </>
            }
            {!isFirstStep &&
                <>
                    <h1 class="text-lg font-bold text-gray-700 leading-tight text-center mb-5">The maximum withdrawin day limit is $500</h1>
                    <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
                        <div class="mb-5">
                            <label class="block mb-1 text-sm font-medium text-gray-900">Your Paypal Email :</label>
                            <p className='text-sm text-orange-500'>Please be careful to not enter wrong email !</p>
                            <input type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-3" required
                                onChange={handleChange} />
                            <label class="block mb-2 text-sm font-medium text-gray-900">Amount :</label>
                            <input type="number" name="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required
                                onChange={handleChange} />
                        </div>
                        <button type='submit' class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">submit</button>
                    </form>
                </>
            }
            {
                message && isAlert && (
                    <div id="alert-3" class="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50" role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div class="ms-3 text-sm font-medium">
                            {message.message}
                        </div>
                        <button onClick={() => setIsAlert(false)} type="button" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )
            }

        </>
    )
}

export default Verification
