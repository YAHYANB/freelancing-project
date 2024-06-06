import React, { useEffect, useState } from 'react';
import { getUser } from './chatRequests';

function Conversation({ data, currentUser, online, receivedMessage, notifications }) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState('');

    useEffect(() => {
        const userId = (parseInt(data.sender_id) === parseInt(currentUser) ? data.receiver_id : data.sender_id);
        const getUserData = async () => {
            try {
                console.log('currentUser', currentUser, 'userId', userId);
                const response = await getUser(userId);
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, [data, currentUser]);

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    useEffect(() => {
        console.log('notifications', notifications);
    }, [notifications]);

    return (
        <>
            {userData && 
                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                    <div className="relative h-10 w-10">
                        <img
                            src={userData?.image || "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                            alt=""
                            className="h-10 w-10 rounded-full"
                        />
                        {online ? (
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                        ) : (
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-gray-400"></span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-[#3b6157]">
                                {userData?.fname + ' ' + userData?.lname}
                            </p>
                            <div className="text-white text-xs bg-red-500 rounded-full px-1 py-0">
                                {notifications?.map((i) => (
                                    i.sender_id === (parseInt(data.sender_id) === parseInt(currentUser) ? data.receiver_id : data.sender_id) && i.count
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Conversation;
