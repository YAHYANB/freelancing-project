import { FaMicrophone } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { addMessage, getMessages, getUser } from "./chatRequests";
import { format } from 'timeago.js'
import { ImSpinner2 } from 'react-icons/im';

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    useEffect(() => {
        const userId = chat?.sender_id === currentUser ? chat.receiver_id : chat.sender_id
        console.log(userId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat?.id)
                console.log(data)
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    }, [chat])
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chat_id === chat.id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])


    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            sender_id: currentUser,
            text: newMessage,
            chat_id: chat.id,
        }
        const receiver_id = (chat?.sender_id === currentUser ? chat.receiver_id : chat.sender_id)
        // send message to socket server
        setSendMessage({ ...message, receiver_id })
        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch {
            console.log("error")
        }
    }
    const scrollRef = useRef(null);

    return (
        <>
            {userData ?
                <div className="flex-1 p-2 sm:pb-6 justify-between md:flex flex-col h-screen hidden xl:flex">
                    <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
                        <div className="flex items-center space-x-4">
                            <img
                                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer"
                                src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                            />
                            <div className="flex flex-row items-center leading-tight">
                                <span className="text-gray-700 mr-3">
                                    {userData?.fname + ' ' + userData?.lname}
                                </span>

                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15 15L21 21" stroke="#8c8c8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                        <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8c8c8c" stroke-width="2">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                            <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                <svg className="h-4 w-4 text-gray-400" fill="#a1a1a1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* START MESSAGES */}

                    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto" ref={scrollRef}>
                        <div className="chat-message space-y-3">
                            {messages.map((message, i) =>
                                <div >
                                    {
                                        message.sender_id == currentUser ?
                                            <div className="flex items-end justify-end" >
                                                <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-end">
                                                    <div >
                                                        <span className="px-4 py-2  rounded-lg inline-block rounded-br-none bg-sky-700 text-white">
                                                            {message.text}
                                                            <p className="text-[10px] text-sky-200 flex justify-end items-end">
                                                                {format(message.created_at)}
                                                            </p>
                                                        </span>

                                                    </div>
                                                </div>

                                            </div>
                                            :

                                            <div className="flex items-end">
                                                <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
                                                    <div >
                                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                                                            {message.text}
                                                            <p className="text-[10px] text-gray-500 flex justify-end">
                                                                {format(message.created_at)}
                                                            </p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                    }


                                </div>
                            )}
                        </div>

                    </div>
                    {/* END MESSAGES */}
                    <div className="border-t-2 border-gray-200 px-4 pt-2 mb-16">
                        <div className="relative flex">
                            <span className="absolute inset-y-0 flex items-center">
                                <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300">
                                    <FaMicrophone />
                                </button>
                            </span>
                            <input
                                name="message"
                                value={newMessage}
                                onChange={handleChange}
                                placeholder="Write something"
                                className="focus:outline-none  focus:ring-green-700 focus:border-green-700 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                            />
                            <span className="absolute right-0 inset-y-0 flex items-center">
                                <button onClick={handleSend} className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-red-500 hover:bg-red-400">
                                    <BiSolidSend className="w-6 h-6" />
                                </button>
                            </span>
                        </div>
                    </div>

                </div>
                :
                <span className="text-center w-full mt-60">
                    <ImSpinner2 className='mx-auto animate-spin text-gray-400 text-2xl ' />
                </span>
            }
        </>
    )
}

export default ChatBox
