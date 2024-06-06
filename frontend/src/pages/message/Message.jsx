import io from 'socket.io-client'
import "./Message.scss";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUser, userChats } from "./chatRequests";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";

const Message = ({ notifications, setNotifications, onlineUsers, receivedMessage, setReceivedMessage, socket }) => {
  const user = useSelector((i) => i.user?.user);
  const [chats, setChats] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    if (user) {
      socket.current.on("recieve-message", (data) => {
        setReceivedMessage(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const getchats = async () => {
        try {
          const { data } = await userChats(user.id);
          setChats(data);
        } catch (error) {
          console.log(error);
        }
      };
      getchats();
    }
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.sender_id === user.id ? chat.receiver_id : chat.sender_id;
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const handleConv = (chat) => {
    setCurrentChat(chat);

    const sender = (parseInt(chat.sender_id) === parseInt(user.id) ? chat.receiver_id : chat.sender_id);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.sender_id !== sender && notification.sender_id !== chat.receiver_id)
    );

    console.log("chat", chat);
  };

  window.scrollTo(0, 0);
  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-gray-50">
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
            <div className="flex-1 min-w-0 bg-white xl:flex">
              {/* -------------------------START LEFT SIDE ---------------------------------------------------------- */}
              <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <div className="h-full relative">
                    <div className="relative rounded-lg px-2 py-2  flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-700">
                      <div className="flex-shrink-0">
                        <img
                          src={user?.image || "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                          alt=""
                          className="h-12 w-12 rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a href="" className="focus:outline-none">
                          <span className="absolute inset-0" />
                          <p className="text-sm font-bold text-[#1F4B3F]">{user?.fname + ' ' + user?.lname}</p>
                          <p className="text-sm text-gray-500 truncate">Admin account</p>
                        </a>
                      </div>
                    </div>

                    <div className="my-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M15 15L21 21" stroke="#8c8c8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8c8c8c" stroke-width="2"></path>
                            </g>
                          </svg>
                        </div>
                        <input
                          name="search"
                          placeholder="Search"
                          className="focus:outline-none focus:ring-green-700 focus:border-green-700 block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border"
                        />
                      </div>
                    </div>
                    {/* SEARCH BOX END */}
                    {/* USERS MESSAGE BOX */}
                    {chats?.map((chat) => (
                      <div onClick={() => handleConv(chat)} className='cursor-pointer' key={chat.id}>
                        <Conversation data={chat} notifications={notifications} currentUser={user.id} online={checkOnlineStatus(chat)} receivedMessage={receivedMessage} />
                      </div>
                    ))}
                    {/* END USERS MESSAGE BOX */}
                  </div>
                </div>
              </div>
              {/* ------------------ -------END LEFT SIDE ---------------------------------------------------------- */}
              {/* -------------------------START MIDDLE SIDE ---------------------------------------------------------- */}
              {currentChat ?
                <ChatBox chat={currentChat} currentUser={user.id} setSendMessage={setSendMessage} receivedMessage={receivedMessage} />
                :
                <div className='container w-full h-screen mx-auto text-center'>
                  <h1 className='text-gray-500 text-sm text-center py-[25%]'>Your personal messages are end-to-end encrypted</h1>
                </div>
              }
              {/* -------------------------END MIDDLE SIDE ---------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
