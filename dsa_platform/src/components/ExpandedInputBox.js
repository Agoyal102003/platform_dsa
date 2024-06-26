import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './CommunityInput.css';

function ExpandedInputBox({ addPost, onClose }) {
    const [postContent, setPostContent] = useState('');
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [userData, setUserData] = useState({
        fullName: '',
        profileImage: '', // Initialize profile image as empty string
    });
    const contentEditableRef = useRef(null);

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
                const res = await axios.get('/api/users/profile', config);
                setUserData({
                    fullName: res.data.fullName || 'A', // Default if fullName is empty
                    profileImage: res.data.profileImage || '', // Set profile image from API response
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error if needed
            }
        };

        fetchUserData();
    }, []);

    const handleContentChange = (e) => {
        const content = e.target.innerText.trim();
        setPostContent(content);
        setShowPlaceholder(content.length === 0);
    };

    const handleFocus = () => {
        setShowPlaceholder(false);
    };

    const handleBlur = () => {
        if (postContent.length === 0) {
            setShowPlaceholder(true);
        }
    };

    const handlePublish = () => {
        if (postContent.trim()) {
            addPost(postContent);
            setPostContent('');
            contentEditableRef.current.innerText = '';
            if (onClose) {
                onClose();
            }
        }
    };

    useEffect(() => {
        console.log("ExpandedInputBox mounted");
        return () => {
            console.log("ExpandedInputBox unmounted");
        };
    }, []);

    // Function to get the initial of the user's full name
    const getUserInitial = (fullName) => {
        if (!fullName) return 'A'; // Default to 'A' if no name is provided
        return fullName.charAt(0).toUpperCase();
    };
    

    return (
        <div className='blurbackground'>
            <div className="expanded-input-box">
                <div className="header">
                    <div className="profile-info">
                        <div className="profile-picture">
                            {userData.profileImage ? (
                                <img src={userData.profileImage} alt="Profile" style={{ borderRadius: "100%" }} />
                            ) : (
                                <div className="profile-initials">
                                    {getUserInitial(userData.fullName)}
                                </div>
                            )}
                        </div>
                        <div className="profile-details">
                            <span className="profile-name">{userData.fullName}</span>
                        </div>
                    </div>
                    <div className="close-icon" onClick={onClose}>✖</div>
                </div>
                <div className="post-editor">
                    {showPlaceholder && (
                        <div className="editor-placeholder" onClick={() => contentEditableRef.current.focus()}>
                            Describe what’s on your mind....
                        </div>
                    )}
                    <div
                        ref={contentEditableRef}
                        className="content-editable"
                        contentEditable="true"
                        spellCheck="true"
                        role="textbox"
                        onInput={handleContentChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
                <div className="additional-options">
                    <div className="character-count">
                        Character Count: {postContent.length} / 1000
                    </div>
                    <div className="editor-actions">
                        <button className="publish-button" onClick={handlePublish}>Publish</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandedInputBox;
