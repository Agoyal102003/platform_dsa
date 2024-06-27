import React, { useState, useEffect } from "react";
import './CommunityInput.css';
import axios from "axios";
import MovingTextPlaceholder from './MovingTextPlaceholder';
import ExpandedInputBox from './ExpandedInputBox';

function CommunityInput({ addPost }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [userData, setUserData] = useState({
        fullName: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            if (!token) {
                return; // Exit if token is not available
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token as Authorization header
                },
            };

            try {
                const res = await axios.get('https://platform-dsa-1.onrender.com/api/users/profile', config);
                setUserData({
                    fullName: res.data.fullName || 'A', // Default if fullName is empty
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error if needed
            }
        };

        fetchUserData();
    }, []);

    const handlePlaceholderClick = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    // Function to get the initial of the user's full name
    const getUserInitial = (fullName) => {
        if (!fullName) return 'A'; // Default to 'A' if no name is provided
        return fullName.charAt(0).toUpperCase();
    };

    return (
        <div className="EditorModal_card-wrapper__YXtlV">
            <div style={{ display: 'flex', paddingTop: '10px', alignItems: 'center' }}>
                <div className="EditorModal_placeholder-wrapper__WGN9O">
                    <div style={{ cursor: 'pointer', display: 'flex' }}>
                        <p className="EditorModal_profile-picture-as-initials__ikBpQ"
                            style={{ backgroundColor: 'rgb(231, 231, 231)', fontWeight: 600 }}>{getUserInitial(userData.fullName)}</p>
                    </div>
                    <div className="EditorModal_placeholder__4bO1W">
                        {isExpanded ? (
                            <ExpandedInputBox onClose={handleClose} addPost={addPost} />
                        ) : (
                            <MovingTextPlaceholder onClick={handlePlaceholderClick}/>
                        )}
                    </div>
                </div>
            </div>
            <div className="ant-divider css-1xg9z9n ant-divider-horizontal editorFeedDivider"
                role="separator" style={{ margin: '16px 0px' }}>
            </div>
        </div>
    );
}

export default CommunityInput;
