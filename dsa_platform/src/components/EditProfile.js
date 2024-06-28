import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import './EditProfile.css';
import SideNavBar from './SideNavBarCommunity';

function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        contactNo: '',
        institution: '',
        bio: '',
        language: '',
        gender: '',
    });

    // Fetch user profile data on component mount
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
                const userProfile = res.data;
                setFormData({
                    name: userProfile.fullName || '',
                    email: userProfile.email || '',
                    username: userProfile.username || '',
                    contactNo: userProfile.contactNo || '',
                    institution: userProfile.institution || '',
                    bio: userProfile.bio || '',
                    language: userProfile.language || '',
                    gender: userProfile.gender || ''
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
                // Handle error if needed
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Send token as Authorization header
            },
        };

        try {
            const res = await axios.post('https://platform-dsa-1.onrender.com/api/users/profile', formData, config);
            console.log('Profile update response:', res.data);

            // Handle success response if needed
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error response
        }
    };

    return (
        <div style={{ backgroundColor: "#0a0e0f" }}>
            <Header />
            <div className='boxedit'>
                <div>
                    <div className="card cardedit">
                        <div className="card-header cardheaderedit">Profile Picture</div>
                        <div className="card-body text-center">
                            <img className="img-account-profile rounded-circle mb-2 editimg" src={`https://bootdey.com/img/Content/avatar/avatar1.png`} alt="Profile" />
                            {/* <div className='imginpt'>
                                <input type="file" name="profileImage" onChange={handleFileChange} />
                            </div> */}
                        </div>
                    </div>
                    <div className='editsidebar'>
                        <SideNavBar />
                    </div>
                </div>
                <div className='editprofilebox'>
                    <p>Personal info:</p>
                    <form onSubmit={handleSubmit} className='formedit'>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email Id:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Contact No:</label>
                            <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Institution:</label>
                            <input type="text" name="institution" value={formData.institution} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Bio:</label>
                            <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Languages:</label>
                            <input type="string" name="language" value={formData.language} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <select name="gender" style={{backgroundColor: "rgb(32, 36, 38)", color: "whitesmoke"}} value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
