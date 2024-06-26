// src/redux/leaderboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching leaderboard data
export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leaderboardSlice.reducer;
