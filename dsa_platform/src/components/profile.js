import React, { useState, useEffect } from "react";
import "./profile.css"; // Import the CSS file
import { Edit } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSolvedProblems } from '../redux/problemSlice';
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [profileData, setProfileData] = useState({
        fullName: '',
        username: '',
        institution: '',
        language: '',
        profileImage: '',
        rank: 0  // Initialize rank in state
    });

    const solvedProblems = useSelector((state) => state.problems.solvedProblems);

    useEffect(() => {
        dispatch(fetchSolvedProblems());
    }, [dispatch]);

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const res = await axios.get('/api/users/profile', config);
                setProfileData({
                    fullName: res.data.fullName || 'A',
                    username: res.data.username || 'N/A',
                    institution: res.data.institution || 'N/A',
                    language: res.data.language || 'N/A',
                    profileImage: res.data.profileImage || '',
                    rank: res.data.rank || 0  // Update rank from API response
                });
                console.log("Profile data updated in state:", res.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="fulldiv"> 
            <div className="onediv">
                <div className="profileImg">
                    {profileData.profileImage ? (
                        <img src={profileData.profileImage} alt="Profile" className="profileImageAsInitials_head__iG5KE undefined" />
                    ) : (
                        <p
                            style={{
                                backgroundColor: 'rgb(231, 231, 231)',
                                fontWeight: 600,
                                fontSize: '60px'
                            }}
                            className="profileImageAsInitials_head__iG5KE undefined"
                        >
                            {profileData.fullName.charAt(0)}
                        </p>
                    )}
                    <div className="profilePicSection_head_img_editBbutton__3l8L7"></div>
                </div>

                <div className="box entryno">{profileData.username}</div>
                <div className="box entryno"><span className="rank">Rank</span> {profileData.rank}</div> {/* Display dynamic rank */}
            </div>

            <div className="twodiv">
                <div className="bttn">
                    <button className="btn btn-success" onClick={() => navigate('/EditProfile')}><Edit className="icon" />Edit Profile</button>
                </div>
                <div className="block block1">
                    
                    <div className="box">
                        <div className="head">Institution</div>
                        <div className="head1">{profileData.institution}</div>
                    </div>
                    <div className="box">
                        <div className="head">Language Used</div>
                        <div className="head1">{profileData.language}</div>
                    </div> 
                </div>

                <div className="block">
                    <div style={{ display: "flex"}}>
                        <div>
                            <div className="head over">Overall Coding Score</div>
                            <div className="head1 coding">{solvedProblems.length}</div>
                        </div>
                        <div className="img-container">
                            <img 
                                style={{
                                    display: 'block',
                                    maxWidth: '100%',
                                    width: 'initial',
                                    height: 'initial',
                                    background: 'none',
                                    opacity: 1,
                                    border: 0,
                                    margin: 0,
                                    padding: 0
                                }} 
                                alt="" 
                                aria-hidden="true" 
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2760%27%20height=%2760%27/%3e" 
                            />
                            <img 
                                className="overlay-img"
                                alt="icon" 
                                src="https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg" 
                                decoding="async" 
                                data-nimg="intrinsic" 
                                srcSet="https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg 1x, https://media.geeksforgeeks.org/auth-dashboard-uploads/Group-96.svg 2x" 
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;
