// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/api/posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    allPosts: [],
    showUserPosts: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.allPosts = action.payload;
    },
    removePost: (state, action) => {
        const postId = action.payload;
        state.posts = state.posts.filter(post => post._id !== postId);
    },
    filterPostsByUser: (state, action) => {
      state.posts = state.allPosts.filter(post => post.authorId === action.payload);
      state.showUserPosts = true;
    },
    fetchAllPosts: (state) => {
      state.posts = state.allPosts;
      state.showUserPosts = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.allPosts = action.payload;
    });
  },
});

export const { setPosts, filterPostsByUser, fetchAllPosts, removePost } = postsSlice.actions;
export default postsSlice.reducer;
