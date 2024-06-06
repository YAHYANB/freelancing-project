import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:8000/api' })


export const userChats = (id) => API.get(`/chat/${id}`)
export const getUser = (userId) => API.get(`/user/${userId}`)

export const getUserProfile = (userId) => API.get(`/profile/${userId}`)


export const getMessages = (id) => API.get(`/message/${id}`)
export const addMessage = (data) => API.post('/message/', data);

export const fetchAddChat = (data) => API.post('/chats', data);

