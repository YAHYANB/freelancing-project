import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchRating = createAsyncThunk('rating/fetchRating', async (data) => {
    const { token, id } = data
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/gigs/${id}/reviews`, {})
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.response.data);
    }

})


export const fetchAddRating = createAsyncThunk('rating/fetchAddRating', async (req) => {
    const { data, token } = req
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/gigs/reviews', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err.response.data);
    }

})
export const fetchDeleteRating = createAsyncThunk('rating/fetchDeleteRating', async (req) => {
    const { id, token } = req
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/gigs/${id}/reviews/delete`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err.response.data);
    }

})


const RatingSlice = createSlice({
    name: 'rating',
    initialState: {
        status: null,
        review: {},
        reviews: {},
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddRating.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddRating.fulfilled, (state, action) => {
                state.status = 'success';
                state.review = action.payload;
            })
            .addCase(fetchAddRating.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchRating.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRating.fulfilled, (state, action) => {
                state.status = 'success';
                state.reviews = action.payload;
            })
            .addCase(fetchRating.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchDeleteRating.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteRating.fulfilled, (state, action) => {
                state.status = 'success';
                state.review = action.payload;
            })
            .addCase(fetchDeleteRating.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default RatingSlice.reducer