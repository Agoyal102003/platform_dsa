// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import problemReducer from './problemSlice';
import leaderboardReducer from './leaderboardSlice';
import postsReducer from './postsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        problems: problemReducer,
        leaderboard: leaderboardReducer,
        posts: postsReducer,
    },
});

export default store;
