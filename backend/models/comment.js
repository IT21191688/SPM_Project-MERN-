const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  // You can add more fields like date, likes, etc. as needed
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
