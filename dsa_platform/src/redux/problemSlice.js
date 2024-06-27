// src/redux/problemSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSolvedProblems = createAsyncThunk('problems/fetchSolvedProblems', async () => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  };
  const response = await axios.get('https://platform-dsa-1.onrender.com/api/users/profile', config);
  return response.data.solvedProblems;
});

const problemSlice = createSlice({
  name: 'problems',
  initialState: {
    solvedProblems: [],
        status: 'idle',
        error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolvedProblems.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSolvedProblems.fulfilled, (state, action) => {
        state.solvedProblems = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchSolvedProblems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default problemSlice.reducer;
