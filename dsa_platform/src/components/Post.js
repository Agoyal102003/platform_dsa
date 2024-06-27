import React, { useState, useEffect} from "react";
import axios from 'axios';
import Comments from './Comments';
import './CommunityInput.css';

function Post({ post, removePost }) {
    const [comments, setComments] = useState(post.comments || []);
    const [commentText, setCommentText] = useState('');
    const [commentCount, setCommentCount] = useState(comments.length);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount);

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`https://platform-dsa-1.onrender.com/api/posts/${post._id}/likeStatus`, config);
                setLiked(response.data.liked);
                setLikeCount(response.data.likeCount);
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };

        checkLikeStatus();
    }, [post._id]);

    const handlePostActionsClick = () => {
        setShowDeleteButton(!showDeleteButton);
    };

    const handleDeletePost = async () => {
        try {
            const response = await fetch(`https://platform-dsa-1.onrender.com/api/posts/${post._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Post not found');
                } else {
                    throw new Error('Failed to delete post');
                }
            }

            removePost(post._id);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
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
                profileImage: response.data.profileImage,
                userId: response.data._id,
            };
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const handleCommentSubmit = async () => {
        if (commentText.trim() === '') return;

        const currentUser = await fetchCurrentUser();

        if (!currentUser) {
            console.error('User data not found');
            return;
        }

        const newComment = {
            text: commentText,
            author: currentUser.fullName,
            authorId: currentUser.userId,
            authorImage: currentUser.profileImage,
        };

        try {
            const response = await fetch(`https://platform-dsa-1.onrender.com/api/posts/${post._id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const { newComment: savedComment, commentCount: updatedCommentCount } = await response.json();

            setComments([...comments, savedComment]);
            setCommentText('');
            setCommentCount(updatedCommentCount);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleLikeClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(`https://platform-dsa-1.onrender.com/api/posts/${post._id}/like`, {}, config);
            setLiked(response.data.liked);
            setLikeCount(response.data.likeCount);
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };
    
    

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`https://platform-dsa-1.onrender.com/api/posts/${post._id}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Comment not found');
                } else {
                    throw new Error('Failed to delete comment');
                }
            }

            const updatedComments = comments.filter(comment => comment._id !== commentId);
            setComments(updatedComments);
            setCommentCount(updatedComments.length);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Function to get the initial of the author's name
    const getAuthorInitial = (authorName) => {
        if (!authorName) return '';
        return authorName.charAt(0).toUpperCase();
    };

    return (
        <div className="post_card" id={post.id} data-post-id={post.id}>
            <div className="post_wrapper">
                <div className="post_header">
                    <div className="post_author_link">
                    
                    {post.authorImage ? (
                                <img
                                src={`https://platform-dsa-1.onrender.com/${post.authorImage}`}
                                alt="Profile"
                                className="post_author_image"
                                style={{ objectFit: 'cover' }}
                            />
                            ) : (<div className="post_author_imageee">
                                {getAuthorInitial(post.author)}
                                </div>
                            )}
                    
                        <div className="post_author_details">
                            <span className="post_author_name">{post.author}</span>
                            <span className="post_author_role">{post.role}</span>
                            <span className="post_time">{post.time}</span>
                        </div>
                    </div>
                    <div className="post_actions">
                        <span className="post_more_icon" style={{ color: "white" }} onClick={handlePostActionsClick}>
                            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                                <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                            </svg>
                        </span>
                        {showDeleteButton && (
                            <button onClick={handleDeletePost} className="delete_button">
                                Delete Post
                            </button>
                        )}
                    </div>
                </div>
                <div className="post_content">
                    <p>{post.content}</p>
                </div>
                <div className="post_engagement">
                    <div className="post_engagement_stats">
                        <div className="post_engagement_item" onClick={handleLikeClick}>
                            <span className="Engagement_engagement_icons_span__YOVwc">
                                <span className={`Engagement_engagement_like_span_dark_bg__LQmVl ${liked ? 'liked' : ''}`}></span>
                            </span>
                            <p className="Engagement_engagement_like_p__668FL">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</p>
                        </div>
                        <div className="post_engagement_item">
                            <span className="Engagement_engagement_icons_span__YOVwc">
                                <span className="Engagement_engagement_comment_span_bg_dark__yFD0C "></span>
                            </span>
                            <p className="Engagement_engagement_like_p__668FL">{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</p>
                        </div>
                    </div>
                </div>
                <div className="post_comment_section" style={{ backgroundColor: "#202426", borderRadius: "10px", padding: "10px", marginTop: "30px" }}>
                    <Comments comments={comments} postId={post._id} onDeleteComment={handleDeleteComment} />
                    <div className="post_comment_input">
                        <p className="comment_profile_initials">A</p>
                        <div style={{ backgroundColor: "#252b2e", width: "92%", display: "flex", borderRadius: "20px" }}>
                            <textarea
                                placeholder="Add a comment"
                                className="comment_text_input"
                                value={commentText}
                                onChange={handleCommentChange}
                                style={{ resize: 'none', backgroundColor: "#252b2e", height: "40px" }}
                            />
                            <span onClick={handleCommentSubmit} style={{ cursor: "pointer" }}>
                                <span className="CommunityIcon_community_icon_span__jwtCO">
                                    <span className="CommunityIcon_community_icon_span_bg__9Wgqo CommunityIcon_send_icon_disabled_dark__9sG9A">
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
