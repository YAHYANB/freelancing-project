import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('order/FetchOrder', async (data) => {
    const {token, userId} = data
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders/${userId}`
            , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data
    } catch (err) {
        console.log(err)
    }
})
export const pollOrder = createAsyncThunk('order/pollchOrder', async (userId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders/poll/${userId}`);
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const acceptOrder = createAsyncThunk('order/AcceptOrder', async (orderId) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/acceptOrder/${orderId}`);
        return response.data
    } catch (err) {
        return err.response.data
    }
})

export const refundOrder = createAsyncThunk('order/RefundOrder', async (orderId) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/refund/${orderId}`);
        return response.data
    } catch (err) {
        return err.response.data
    }
})

export const markOrdersAsSeen = createAsyncThunk('order/markOrdersAsSeen', async (userId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders/seen/${userId}`);
        return response.data
    } catch (err) {
        return err.response.data
    }
})

const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        status: null,
        newOrder: null,
        order: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'success'
                state.order = action.payload
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'faild'
                state.order = action.error.message
            })
            .addCase(pollOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(pollOrder.fulfilled, (state, action) => {
                state.status = 'success'
                state.newOrder = action.payload
            })
            .addCase(pollOrder.rejected, (state, action) => {
                state.status = 'faild'
                state.newOrder = action.error.message
            })
            .addCase(acceptOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(acceptOrder.fulfilled, (state, action) => {
                state.status = 'success'
                state.newOrder = action.payload
            })
            .addCase(acceptOrder.rejected, (state, action) => {
                state.status = 'faild'
                state.order = action.error.message
            })
            .addCase(refundOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(refundOrder.fulfilled, (state, action) => {
                state.status = 'success'
                state.newOrder = action.payload
            })
            .addCase(refundOrder.rejected, (state, action) => {
                state.status = 'faild'
                state.order = action.error.message
            })
            .addCase(markOrdersAsSeen.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(markOrdersAsSeen.fulfilled, (state, action) => {
                state.status = 'success'
                state.order = action.payload
            })
            .addCase(markOrdersAsSeen.rejected, (state, action) => {
                state.status = 'faild'
                state.order = action.error.message
            })
    }
})

export default OrderSlice.reducer