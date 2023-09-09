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
      navigate(`/allpost`);



    } catch (error) {
      // Handle errors (e.g., show an error message)
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
              className="form-input w-full p-2 border border-themeLightGray rounded-md"
              required
            />
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
              className="form-textarea w-full p-2 border border-themeLightGray rounded-md"
              required
            ></textarea>
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

