const express = require('express');
const PostController = require('../controllers/postController');

const router = express.Router();

// Post routes
router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

// Implement other post-related routes as needed

module.exports = router;
