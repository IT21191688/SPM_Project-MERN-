import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CreateTutorial() {
  const { courseId, courseName } = useParams();

  const [tutorialData, setTutorialData] = useState({
    title: '',
    description: '',
    courseid: courseId,
  });

  const [pdfFile, setPdfFile] = useState(null); // Store the selected PDF file
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorialData({
      ...tutorialData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send both the tutorialData and the PDF file
      const formData = new FormData();
      formData.append('title', tutorialData.title);
      formData.append('description', tutorialData.description);
      formData.append('courseid', tutorialData.courseid);
      formData.append('pdf', pdfFile); // 'pdf' should match the field name on the server

      await axios.post('http://localhost:8080/tutorials/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      // Redirect to the "View Tutorials" page on success
      navigate('/getCourseAdmin');
    } catch (error) {
      console.error('Error creating tutorial:', error);
    }
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <h2 className="text-3xl font-semibold">Create Tutorial for {courseName}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold text-primary mb-2">
            Tutorial Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={tutorialData.title}
            onChange={handleChange}
            className="border border-primary rounded-lg py-2 px-3 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold text-primary mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={tutorialData.description}
            onChange={handleChange}
            className="border border-primary rounded-lg py-2 px-3 w-full h-32"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pdf" className="block font-semibold text-primary mb-2">
            Upload PDF:
          </label>
          <input
            type="file"
            id="pdf"
            name="pdf"
            onChange={handleFileChange}
            accept=".pdf" // Specify that only PDF files are allowed
            className="border border-primary rounded-lg py-2 px-3 w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300"
          >
            Create Tutorial
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTutorial;
