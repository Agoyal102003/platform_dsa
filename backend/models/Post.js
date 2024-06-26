const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    authorImage: { type: String, default: '' },
});

const LikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const postSchema = new Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: false },
    time: { type: String, required: true },
    authorImage: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema], // Nested comments schema
    likes: [LikeSchema],
    likeCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);
