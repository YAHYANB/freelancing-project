import { FaMicrophone } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";

import "./Message.scss";

const Message = () => {
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
                          src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                          className="h-12 w-12 rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a href="" className="focus:outline-none">
                          <span className="absolute inset-0" />
                          <p className="text-sm font-bold text-[#1F4B3F]">Yahya Naib</p>
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
                              <path d="M15 15L21 21" stroke="#8c8c8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              </path>
                              <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8c8c8c" stroke-width="2">
                              </path>
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
                    {[1, 2, 3, 4].map((_, index) =>
                      <div key={index} className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                        <div className="flex-shrink-0">
                          <img
                            src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="" className="focus:outline-none" >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-[#3b6157]">
                                Hafid Boumia
                              </p>
                              <div className="text-gray-400 text-xs">
                                12:35 AM
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500 truncate">
                                Hello
                              </p>
                              <div className="text-white text-xs bg-red-500 rounded-full px-1 py-0">
                                2
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    )}
                    {/* END USERS MESSAGE BOX */}


                  </div>
                </div>
              </div>
              {/* ------------------ -------END LEFT SIDE ---------------------------------------------------------- */}

              {/* -------------------------START MIDDLE SIDE ---------------------------------------------------------- */}

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
                        Hafid Boumia
                      </span>
                      <span className="text-green-500">
                        <svg width={10} height={10}>
                          <circle cx={5} cy={5} r={5} fill="currentColor" />
                        </svg>
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

                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar">
                  <div className="chat-message">
                    {[1, 2, 3, 4].map((_, i) =>
                      <>
                        {/* WHITE MESSAGE */}
                        <div className="flex items-end">
                          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div >
                              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                                You can inspect the element using your browser's developer tools to see if these classes are applied.
                              </span>
                            </div>
                          </div>
                          <img
                            className="w-6 h-6 rounded-full order-1"
                            src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                          />
                        </div>
                        {/* GREEN MESSAGE */}
                        <div className="flex items-end justify-end">
                          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                            <div >
                              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-sky-700 text-white">
                                It looks like you're trying to apply focus styles to an input element in HTML with Tailwind CSS classes. If the focus styles aren't working as expected, there could be a few reasons why.
                              </span>
                            </div>
                          </div>
                          <img
                            className="w-6 h-6 rounded-full order-1"
                            src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                          />
                        </div>
                      </>
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
                      placeholder="Write something"
                      className="focus:outline-none  focus:ring-green-700 focus:border-green-700 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                    />
                    <span className="absolute right-0 inset-y-0 flex items-center">
                      <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-red-500 hover:bg-red-400">
                        <BiSolidSend className="w-6 h-6" />
                      </button>
                    </span>
                  </div>
                </div>
                
              </div>
              {/* -------------------------END MIDDLE SIDE ---------------------------------------------------------- */}

              {/* -------------------------START RIGTH SIDE ---------------------------------------------------------- */}
              {/* <div className="bg-gray-50 w-64 pt-5 px-6 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
                <div className="h-full relative">
                  <div className="m-auto text-center mb-10">
                    <img
                      src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                      className="h-36 w-36 rounded-full m-auto"
                    />
                    <h2 className="m-auto text-2xl mt-2">kina Mayer</h2>
                  </div>

                  <div className="mb-2">
                    <h4>Attachments</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_,index)=> 
                      <div key={index}>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
              {/* -------------------------END RIGTH SIDE ---------------------------------------------------------- */}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
