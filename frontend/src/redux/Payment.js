import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPayment = createAsyncThunk('payment/fetchpayment', async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/payment'
            // , {
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            // }
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const createPayment = createAsyncThunk('payment/Createpayment', async (data) => {
    const { token, gigData } = data
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/payment`, gigData
            , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const FetchWithDraw = createAsyncThunk('payment/fetchwithdraw', async (data) => {
    const { token, formData } = data
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/payout', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

const PaymentSlice = createSlice({
    name: 'payment',
    initialState: {
        status: null,
        payment: null,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayment.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPayment.fulfilled, (state, action) => {
                state.status = 'success'
                state.payment = action.payload
            })
            .addCase(fetchPayment.rejected, (state, action) => {
                state.status = 'faild'
                state.payment = action.error.message
            })

            .addCase(createPayment.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload) {
                    window.location.href = action.payload.link;
                }
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.status = 'faild'
                state.payment = action.error.message
            })

            .addCase(FetchWithDraw.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(FetchWithDraw.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload) {
                    state.message = action.payload
                }
            })
            .addCase(FetchWithDraw.rejected, (state, action) => {
                state.status = 'faild'
                state.message = action.error.message
            })
    }

})

export default PaymentSlice.reducer