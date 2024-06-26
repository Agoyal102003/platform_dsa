const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import the Post model
const authenticateToken = require('../middleware/auth');

// Create a new post
router.post('/', async (req, res) => {
    const { content, author, role, time, authorImage, authorId } = req.body;

    try {
        if (!content || !author || !time || !authorId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newPost = new Post({ content, author, role, time, authorImage, authorId });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// GET like status for current user
router.get('/:postId/likeStatus', authenticateToken, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id; // Assuming userId is extracted from authenticated user

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const liked = post.likes.some(like => like.userId.toString() === userId.toString());
        const likeCount = post.likes.length;

        res.json({ liked, likeCount });
    } catch (error) {
        console.error('Error fetching like status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST like/unlike a post
router.post('/:postId/like', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const userId = req.user.id; // Assuming the authenticated user ID is available

        // Check if the user already liked the post
        const isLiked = post.likes.some(like => like.userId.toString() === userId.toString());

        if (isLiked) {
            // User already liked the post, unlike it
            post.likes = post.likes.filter(like => like.userId.toString() !== userId.toString());
            post.likeCount--;
        } else {
            // User hasn't liked the post, like it
            post.likes.push({ userId });
            post.likeCount++;
        }

        await post.save();
        res.json({ liked: !isLiked, likeCount: post.likeCount });
    } catch (err) {
        console.error('Error updating like:', err);
        res.status(500).send('Server Error');
    }
});


// DELETE a post by ID
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post', error });
    }
});

// DELETE route to delete a comment by ID
router.delete('/:postId/comments/:commentId', async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        // Use findByIdAndUpdate to remove the comment from comments array
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// Add a new comment to a post
router.post('/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { text, author, authorId, authorImage } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const newComment = { text, author, authorId, authorImage };
        post.comments.push(newComment);
        await post.save();

        // Return the updated post including the comment count
        res.status(201).json({ newComment, commentCount: post.comments.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});


// Fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

module.exports = router;
