import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import { useNavigate } from 'react-router-dom';
import '../css/createPost.css'; // Import custom CSS for styling




function CreatePost() {


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/posts/posts', {
        title,
        content,
      });

      // Handle a successful response (e.g., show a success message)
      console.log('Post created:', response.data);

      // Clear the form fields after successful submission
      setTitle('');
      setContent('');

      alert('Post created successfully');
      navigate(`/`);



    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container create-post">
      <h2 className="create-post-title">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            rows="4"
            className="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn create-post-btn">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

