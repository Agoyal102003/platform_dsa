import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import './EditProfile.css';
import SideNavBar from './SideNavBarCommunity';

function EditProfile() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        contactNo: '',
        institution: '',
        bio: '',
        profileImage: null,
        language: '',
        gender: '',
    });
    const [imagePreview, setImagePreview] = useState('https://bootdey.com/img/Content/avatar/avatar1.png'); // Default image URL

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
                    fullName: userProfile.fullName || '',
                    email: userProfile.email || '',
                    username: userProfile.username || '',
                    contactNo: userProfile.contactNo || '',
                    institution: userProfile.institution || '',
                    bio: userProfile.bio || '',
                    profileImage: userProfile.profileImage || null,
                    language: userProfile.language || '', 
                    gender: userProfile.gender || ''
                });
                // If user has a profile image, set it as the image preview
                if (userProfile.profileImage) {
                  setImagePreview(userProfile.profileImage);
              }
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

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, profileImage: file });

      // Read the file and update the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
          setImagePreview(reader.result); // Update state with the selected image's data URL
      };

      if (file) {
          reader.readAsDataURL(file);
      } else {
          setImagePreview('https://bootdey.com/img/Content/avatar/avatar1.png'); // Reset to default image if no file is selected
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('contactNo', formData.contactNo);
    formDataToSend.append('institution', formData.institution);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('language', formData.language);
    formDataToSend.append('gender', formData.gender);

    if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Send token as Authorization header
        },
    };

    try {
        const res = await axios.post('https://platform-dsa-1.onrender.com/api/users/profile', formDataToSend, config);
        console.log('Profile update response:', res.data);

        // Update image URL if profileImage was uploaded
        if (formData.profileImage) {
          setImagePreview(URL.createObjectURL(formData.profileImage)); // Update image after save
        }

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
                        <img className="img-account-profile rounded-circle mb-2 editimg" src={`https://platform-dsa-1.onrender.com/${imagePreview}`} alt="Profile" />
                            <div className='imginpt'>
                                <input type="file" name="profileImage" onChange={handleFileChange} />
                            </div>
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
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
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
