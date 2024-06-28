// src/components/Feed.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, removePost as removePostAction} from '../redux/postsSlice';
import Post from './Post';
import CommunityInput from './CommunityInput';
import FeedButton from './FeedButton';
import axios from 'axios';
import './CommunityInput.css';

function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    // const showUserPosts = useSelector((state) => state.posts.showUserPosts);
    // const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                const response = await axios.get('https://platform-dsa-1.onrender.com/api/posts');
                dispatch(setPosts(response.data));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchInitialPosts();
    }, [dispatch]);

    const removePost = (postId) => {
        dispatch(removePostAction(postId));
    };

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return null;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get('https://platform-dsa-1.onrender.com/api/users/profile', config);
            return {
                fullName: response.data.fullName,
                username: response.data.username,
                // profileImage: response.data.profileImage,
                bio: response.data.bio,
                userId: response.data._id,
            };
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const addPost = async (content) => {
        const currentUser = await fetchCurrentUser();
        console.log("add post got triggered");

        if (!currentUser) {
            console.error('User data not found');
            return;
        }

        const newPost = {
            content,
            author: currentUser.fullName,
            role: currentUser.bio, 
            time: new Date().toLocaleDateString(),
            // authorImage: currentUser.profileImage,
            authorId: currentUser.userId,
        };
        // console.log("authorImage", newPost.authorImage);
        // console.log("newPost", newPost);

        try {
            const response = await axios.post('https://platform-dsa-1.onrender.com/api/posts', newPost);
            
            if (!response.data) {
                throw new Error('Network response was not ok');
            }

            dispatch(setPosts([response.data, ...posts]));
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div className="feed">
            <div>
                <CommunityInput addPost={addPost} />
                <FeedButton />
            </div>
            <div className="posts">
                {posts.map(post => (
                    <Post key={post._id} post={post} removePost={removePost} />
                ))}
            </div>
        </div>
    );
}

export default Feed;
