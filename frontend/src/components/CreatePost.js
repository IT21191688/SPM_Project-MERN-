import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import '../css/createPost.css'; 
import { useEffect } from 'react';
import jwt from 'jwt-decode';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwt(token);
      const userId = decoded.userId;

      try {
        const response = await axios.post("http://localhost:8080/auth/profile", { userId });
        setName(response.data.firstname + ' ' + response.data.lastname);
      } catch (error) {
        alert('Data Load Unsuccessful' + error);
        console.error(error);
      }
    };

    fetchProfileDetails();
  }, []);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    if (title.trim() === '') {
      setTitleError('Title is required.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (content.trim() === '') {
      setContentError('Content is required.');
      isValid = false;
    } else {
      setContentError('');
    }

    if (!isValid) {
      return; // Do not submit the form if there are validation errors.
    }

    try {
      const response = await axios.post('http://localhost:8080/api/posts/posts', {
        title,
        content,
        name,
      });

      console.log('Post created:', response.data);

      // Clear the form fields after successful submission
      setTitle('');
      setContent('');

      alert('Post created successfully');
      navigate(`/allpost`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-themeBlue mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-themeBlue text-lg font-semibold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                titleError ? 'border-red-500' : ''
              }`}
            />
            {titleError && <p className="text-red-500 mt-2">{titleError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-themeBlue text-lg font-semibold mb-2">
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              rows="4"
              className={`form-textarea w-full p-2 border border-themeLightGray rounded-md ${
                contentError ? 'border-red-500' : ''
              }`}
            ></textarea>
            {contentError && <p className="text-red-500 mt-2">{contentError}</p>}
          </div>
          <button
            type="submit"
            className="btn create-post-btn bg-themePurple hover:bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
