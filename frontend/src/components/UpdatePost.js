import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/updatePost.css'; // Import the separate CSS file for SelectedPost
import { useParams } from 'react-router-dom';

function UpdatePost(props) {
  //const postId = props.match.params.postId; // Get the post ID from the route params
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({ title: '', content: '' });
  const { postId } = useParams();

  useEffect(() => {
    // Fetch the selected post's details
    axios.get(`http://localhost:8080/api/posts/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        // Initialize the updatedPost state with the current post data
        setUpdatedPost({ title: response.data.title, content: response.data.content });
      })
      .catch((error) => {
        console.error('Error fetching post details:', error);
      });
  }, [postId]);

  const handleInputChange = (e) => {
    // Update the updatedPost state based on user input
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Send a PUT request to update the post
    axios.put(`http://localhost:8070/api/posts/posts/${postId}`, updatedPost)
      .then(() => {
        // Redirect to the selected post or perform any other action
        props.history.push(`/post/${postId}`); // You can adjust the redirection URL as needed
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div className="container update-post">
      <h2 className="update-post-title">Update Post</h2>
      <form className="update-form">
        <div>
          <label className="update-label">Title:</label>
          <input
            type="text"
            name="title"
            value={updatedPost.title}
            onChange={handleInputChange}
            className="update-input"
          />
        </div>
        <div>
          <label className="update-label">Content:</label>
          <textarea
            name="content"
            value={updatedPost.content}
            onChange={handleInputChange}
            rows="6"
            className="update-textarea"
          />
        </div>
        <div>
          <button type="button" onClick={handleSubmit} className="update-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePost;