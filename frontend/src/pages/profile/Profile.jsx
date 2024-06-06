import { GrLocation } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { ImSpinner2 } from 'react-icons/im';
import { gigs } from "../../data";
import { format } from 'timeago.js'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAddChat, getUser, getUserProfile } from "../message/chatRequests";
import NotFound from "../../components/notFound/NotFound";

export default function Profile() {
    const { id } = useParams()
    // const user = useSelector(u => u.user.user);
    // const gigs = useSelector((i) => i.gigs?.gigs.gigs);
    const [user, setUser] = useState(null)
    const [gigs, setGigs] = useState(null)
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState(null);
    const [reviews, setReviews] = useState(null);

    


    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await getUserProfile(id);
                if (response) {
                    setUser(response.data.user);
                    setGigs(response.data.gig)
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, [id]);

    if (loading) {
        <ImSpinner2 className='mx-auto animate-spin text-green-700 text-5xl mt-[300px]' />
    }


    useEffect(() => {
        if (gigs) {
            let totalStars = 0;
            let totalReviews = 0;

            gigs.forEach(gig => {
                gig.reviews.forEach(review => {
                    totalStars += review.rating;
                    totalReviews += 1;
                });
            });

            const averageStars = totalReviews ? (totalStars / totalReviews).toFixed(1) : 0;
            setStars(averageStars);
            setReviews(totalReviews)
        }
    }, [gigs]);

    useEffect(() => {
        console.log('stars', stars)
    }, [stars])

    useEffect(() => {
        console.log('gigs', gigs)
    }, [gigs])

    const calculateGigRating = (reviews) => {
        const totalStars = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviews.length ? (totalStars / reviews.length).toFixed(1) : 0;
        return averageRating;
    }

    const addChat = async () => {
        try {
          const data = {
            sender_id: user.id, receiver_id: id
          }
          const response = await fetchAddChat(data)
          if (response.data.status === 200) {
            window.location.href = '/messages'
          }
    
        } catch (err) {
          console.log(err)
        }
        
      }

    return (

        <>
            {user &&
                <div class="">
                    <div class="container mx-auto py-8">
                        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                            <div class="col-span-4 sm:col-span-3">
                                <div class="bg-white shadow-xl rounded-lg sticky top-24  p-6">
                                    <div class="flex flex-col items-center gap-1">
                                        <div className="relative">
                                            <img src={user.profileImg ? `http://127.0.0.1:8000/images/profile/${user?.profileImg}` : 'userPic.png'} class="w-28 h-28 bg-gray-300 rounded-full " />
                                            <span class="bottom-0 right-5 absolute  w-5 h-5 bg-green-400 border-2 border-white  rounded-full"></span>
                                        </div>
                                        <p className="font-medium flex items-center gap-2">
                                            <span>{user?.displayName}
                                                <span className="text-sm text-gray-500">(@{user?.fname}{user?.lname})</span>
                                            </span>
                                            <span class="">
                                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                                </svg>
                                            </span>
                                        </p>
                                        <div className='flex items-center gap-1'>
                                            <GrLocation />
                                            <span>{user?.country}</span>
                                        </div>
                                        <time datetime="2014-08-16 19:00" class="block font-medium text-sm text-gray-500">Joined on {format(user.created_at)}</time>
                                        <div class="flex items-center">
                                            <svg class="w-4 h-4 text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <p class="ms-2 text-sm font-bold text-gray-900">{stars}</p>
                                            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                                            <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline">{reviews} reviews</a>
                                        </div>

                                        <Link className=" bg-neutral-800 hover:bg-neutral-600 text-white py-2 px-16 rounded-md">
                                            <button onClick={addChat}>
                                                Contact Me
                                            </button>
                                        </Link>
                                    </div>
                                    <hr class="my-6 border-t border-gray-300" />
                                    <div class="flex flex-col">
                                        <span class="text-gray-700 font-semibold tracking-wider mb-2">Skills :</span>
                                        <div className="flex flex-wrap mt-3 mb-3 gap-2">
                                            {user.skills?.map(skill =>
                                                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1.5 rounded-full">{skill.title}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-4 sm:col-span-9">
                                <div class="bg-white p-6 flex flex-col gap-8">
                                    <div>
                                        <h2 class="text-gray-700 font-semibold tracking-wider mb-4">About Me :</h2>
                                        <p class="text-gray-700">{user?.description}</p>
                                    </div>
                                    <div>
                                        <h2 class="text-gray-700 font-semibold tracking-wider mt-6 mb-4">Languages :</h2>
                                        {user.languages?.map((lang, id) =>
                                            <div class="mb-6" key={id}>
                                                <div class="flex flex-wrap gap-2 w-full items-center">
                                                    <span class="text-gray-700 font-medium text-sm flex items-center gap-2">
                                                        <IoCheckmarkDoneCircleSharp size="20px" className="text-teal-600" />
                                                        <p>
                                                            {lang.name}
                                                        </p>
                                                    </span>
                                                    <p className="text-xs">
                                                        <span class="text-gray-700 mr-2">{lang.level}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 class="text-gray-700 font-semibold tracking-wider mt-6 mb-4">My Projects :</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {gigs.map((gig) => (
                                                <Link to={`/gig/${gig.id}`} className="link" class="bg-white rounded-sm overflow-hidden shadow-lg w-64 ml-2 hover:shadow-sm">
                                                    <img class="h-40 w-full object-cover object-end" src={'http://127.0.0.1:8000/images/gigs/coverImages/' + gig.coverImage} alt="" />
                                                    <div class="px-2 py-3 flex flex-col gap-2">
                                                        <p>{gig.shortDescription}</p>
                                                        <div class="flex items-center">
                                                            <svg class="w-4 h-4 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                            </svg>
                                                            <p class="ms-2 text-sm font-bold text-gray-900">{calculateGigRating(gig.reviews)}<span className="ml-2 font-normal text-gray-600 text-sm">({gig.reviews.length} reviews)</span></p>
                                                        </div>

                                                        <div class="mt-1">
                                                            <p className="font-md">price : <span className="ml-3 font-semibold text-gray-600">{gig.price}$</span></p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

