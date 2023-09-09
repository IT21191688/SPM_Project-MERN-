const Comment = require('../models/comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      name: req.body.name,
      post: req.params.postId, // Assuming you pass the post ID in the URL
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all comments for a post
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implement other comment-related controller functions as needed
