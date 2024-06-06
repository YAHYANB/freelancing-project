import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addLanguage = createAsyncThunk('languages/addLanguage', async (languageData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/languages', languageData);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

export const updateLanguage = createAsyncThunk('languages/updateLanguage', async (languageData) => {
    const { id, updatedData } = languageData;
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/languages/${id}`, updatedData);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

export const deleteLanguage = createAsyncThunk('languages/deleteLanguage', async (languageId) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/languages/${languageId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

export const addSkills = createAsyncThunk('skills/addSkills', async (SkillsData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/skills', SkillsData);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

export const updateSkills = createAsyncThunk('skills/updateSkills', async (SkillsData) => {
    const { id, updatedData } = SkillsData;
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/skills/${id}`, updatedData);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

export const deleteSkill = createAsyncThunk('skills/deleteSkill', async (SkillId) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/skills/${SkillId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

const initialState = {
    languages: [],
    skills: [],
    status: 'idle',
    error: null
};

const SkillslanguagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLanguage.fulfilled, (state, action) => {
                state.languages = action.payload;
            })
            .addCase(updateLanguage.fulfilled, (state, action) => {
                state.languages = action.payload;;
            })
            .addCase(deleteLanguage.fulfilled, (state, action) => {
                state.languages = action.payload;;
            })
            .addCase(addSkills.fulfilled, (state, action) => {
                state.skills = action.payload;;
            })
            .addCase(updateSkills.fulfilled, (state, action) => {
                state.skills = action.payload;;
            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.skills = action.payload;;
            });
    }
});

export default SkillslanguagesSlice.reducer;
