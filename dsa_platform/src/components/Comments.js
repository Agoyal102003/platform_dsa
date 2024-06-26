import React, { useState } from 'react';

const Comments = ({ comments, postId, onDeleteComment }) => {
    const [showDeleteButton, setShowDeleteButton] = useState(null);

    const handlePostActionsClick = (commentId) => {
        setShowDeleteButton(prevId => prevId === commentId ? null : commentId);
    };

    return (
        <div className="comments_section">
            {comments.map((comment) => (
                <div className="feedCardMain" key={comment._id}>
                    <div className="post_header">
                        <a href={`/community/profile/${comment.authorId}`} className="post_author_link">
                            <img
                                src={comment.authorImage || 'https://media.geeksforgeeks.org/auth/profile/4d22qt8yrho7pplu1lld'}
                                alt="Profile"
                                className="post_Comment_author_image"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="post_author_details" style={{ marginLeft: '10px' }}>
                                <span className="post_Comment_author_name">{comment.author}</span>
                                <span className="post_Comment_author_msg">{comment.text}</span>
                            </div>
                        </a>
                        <div className="post_actions">
                            <span
                                className="post_more_icon"
                                style={{ color: "white" }}
                                onClick={() => handlePostActionsClick(comment._id)}
                            >
                                <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                                    <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                </svg>
                            </span>
                            {showDeleteButton === comment._id && (
                                <button onClick={() => onDeleteComment(comment._id)} className="delete_button">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
