import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllGig = createAsyncThunk('gigs/fetchAllGig', async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/gigs');
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
});

export const fetchAddGig = createAsyncThunk('gigs/fetchAddGig', async (data) => {
    const { token, formData } = data;
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/gigs/add', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        return console.log(err.response.data);
    }
});

export const fetchUpdateGig = createAsyncThunk('gigs/fetchUpdateGig', async (data) => {
    const { token, formData, id } = data;
    console.log(data)
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/gigs/update/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        return console.log(err.response.data);
    }
});

export const fetchShowGig = createAsyncThunk('gigs/fetchShowMyGigs', async (data) => {
    const { token, id } = data;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/gig/show/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
});

export const fetchDestroyGig = createAsyncThunk('gigs/fetchDestroyGig', async (data) => {
    const { token, id } = data;
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/gigs/delete/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
});
const GigSlice = createSlice({
    name: 'gigs',
    initialState: {
        status: null,
        gigs: {},
        gig: {},
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all gig
            .addCase(fetchAllGig.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllGig.fulfilled, (state, action) => {
                state.status = 'success';
                state.gigs = action.payload;
            })
            .addCase(fetchAllGig.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // add gig
            .addCase(fetchAddGig.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddGig.fulfilled, (state, action) => {
                state.status = 'success';
                state.gigs = action.payload;
            })
            .addCase(fetchAddGig.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // get gig by id
            .addCase(fetchShowGig.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShowGig.fulfilled, (state, action) => {
                state.status = 'success';
                state.gig = action.payload;

            })
            .addCase(fetchShowGig.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // update gig 
            .addCase(fetchUpdateGig.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpdateGig.fulfilled, (state, action) => {
                state.status = 'success';
                state.gig = action.payload;

            })
            .addCase(fetchUpdateGig.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // delete gig 
            .addCase(fetchDestroyGig.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDestroyGig.fulfilled, (state, action) => {
                state.status = 'success';
                state.gigs = action.payload;

            })
            .addCase(fetchDestroyGig.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default GigSlice.reducer;
