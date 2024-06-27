import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommunityInput.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterPostsByUser, fetchAllPosts } from '../redux/postsSlice';

function CommunityProfile() { // Update prop name here
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const showUserPosts = useSelector((state) => state.posts.showUserPosts);
    const [profileDataCommunity, setProfileDataCommunity] = useState({
        fullName: '',
        username: '',
        bio: '',
        profileImage: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token as Authorization header
                },
            };

            try {
                const res = await axios.get('https://platform-dsa-1.onrender.com/api/users/profile', config);
                setProfileDataCommunity({
                    fullName: res.data.fullName || 'A',
                    username: res.data.username || 'N/A',
                    bio: res.data.bio || 'N/A',
                    profileImage: res.data.profileImage || '', // Handle empty profile image
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
                // Handle error if needed
            }
        };

        fetchProfileData();
    }, []);

    const handleTogglePosts = () => {
        if (showUserPosts) {
            dispatch(fetchAllPosts());
        } else {
            if (currentUser) {
                dispatch(filterPostsByUser(currentUser._id));
            }
        }
    };

    return (
        <div className="communityprofilebox">
            <div className="onedivcommunity">
                <div className="profileImgcommunity" style={{ backgroundColor: 'rgb(231, 231, 231)' }}>
                    {profileDataCommunity.profileImage ? (
                        <img src={profileDataCommunity.profileImage} alt="Profile" className="profileImgcommunity" />
                    ) : (
                        'A'
                    )}
                </div>

                <div className="profileDetailscommunity">
                    <span style={{ fontWeight: '600' }}>{profileDataCommunity.fullName}<br /></span>
                    <span style={{ fontSize: '14px', fontWeight: '300' }}>{profileDataCommunity.bio}<br /></span>
                    <span style={{ fontSize: '14px', fontWeight: '300' }}>{profileDataCommunity.username}<br /></span>
                </div>
            </div>
            <div>
                <button className="btn btn-success" onClick={handleTogglePosts}>
                    {showUserPosts ? 'Show All Posts' : 'Show My Posts'}
                </button>
            </div>
        </div>
    );
}

export default CommunityProfile;
