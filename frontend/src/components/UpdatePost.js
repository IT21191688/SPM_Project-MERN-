import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/updatePost.css'; // Import the separate CSS file for SelectedPost
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function UpdatePost(props) {
  //const postId = props.match.params.postId; // Get the post ID from the route params
  const [post, setPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({ title: '', content: '' });
  const { postId } = useParams();
  const navigate = useNavigate();


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
    axios.put(`http://localhost:8080/api/posts/posts/${postId}`, updatedPost)
      .then(() => {
        // Redirect to the selected post or perform any other action
        navigate(`/post/${postId}`); // You can adjust the redirection URL as needed
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-themeBlue mb-4">Update Post</h2>
        <form className="update-form">
          <div className="mb-4">
            <label htmlFor="title" className="block text-themeBlue text-lg font-semibold mb-2">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={updatedPost.title}
              onChange={handleInputChange}
              className="form-input w-full p-2 border border-themeLightGray rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-themeBlue text-lg font-semibold mb-2">
              Content:
            </label>
            <textarea
              name="content"
              value={updatedPost.content}
              onChange={handleInputChange}
              rows="6"
              className="form-textarea w-full p-2 border border-themeLightGray rounded-md"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn update-button bg-themePurple hover:bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;