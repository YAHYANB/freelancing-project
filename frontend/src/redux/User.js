import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('user', response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const verifyUser = createAsyncThunk('user/verifyUser', async (data) => {
    const { token, formData } = data
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/user/verify`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
})

export const updateUserData = createAsyncThunk('user/updateUserData', async (data) => {
    const { token, updatedData } = data
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user', updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        return err.response.data
    }
})

export const fetchSender = createAsyncThunk('user/fetchUser', async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchDeletePicture = createAsyncThunk('user/fetchDeletePicture', async (token) => {
    try {
        const response = await axios.delete('http://127.0.0.1:8000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.response.data
    }
})

export const changePassword = createAsyncThunk('user/changePassword', async (data) => {
    const { currentPassword, newPassword, token, userId } = data
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/user/new-password/${userId}`, { currentPassword, newPassword }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchUpdateUser = createAsyncThunk('user/fetchUpdateUser', async (data) => {

    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/user/${data.userId}`, data.userInfo, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        status: null,
        user: null,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get user information
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })

            // update user information
            .addCase(fetchUpdateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload && action.payload.status === 200) {
                    state.user = action.payload
                    window.location.href = '/'
                }
            })
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })

            // update user password
            .addCase(changePassword.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload && action.payload.status === 200) {
                    state.user = action.payload
                    window.location.href = '/setting/profile'
                }
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload && action.payload.status === 200) {
                    state.user = action.payload
                    state.error = null
                } else {
                    state.error = action.payload
                }
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })

            .addCase(verifyUser.pending, (state) => {
                state.message = 'loading'
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.message = action.payload
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.status = 'faild'
                state.message = action.payload
            })

            .addCase(fetchDeletePicture.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchDeletePicture.fulfilled, (state, action) => {
                if (action.payload && action.payload.status === 200) {
                    state.status = 'success'
                    state.user = action.payload
                } else {
                    state.error = action.payload
                }
            })
            .addCase(fetchDeletePicture.rejected, (state, action) => {
                state.status = 'faild'
                state.error = action.error.message
            })
    }

})

export default UserSlice.reducer