import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // You may need to install axios if not already done


function CreateCourse() {

  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    courseid: '',
    coursename: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server to add the course
      await axios.post('http://localhost:8080/courses/add', courseData);
      // Redirect to a different page or display a success message
      alert('Course added successfully!');
      // Optionally reset the form
      setCourseData({
        courseid: '',
        coursename: '',
        description: '',
      });
      navigate('/getCourseAdmin/')


    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error adding course:', error);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-themeLightGray">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-themeBlue mb-4">Create a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseid" className="text-themeBlue">Course ID:</label>
            <input
              type="text"
              id="courseid"
              name="courseid"
              value={courseData.courseid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-themePurple focus:outline-none focus:border-themeBlue"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="coursename" className="text-themeBlue">Course Name:</label>
            <input
              type="text"
              id="coursename"
              name="coursename"
              value={courseData.coursename}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-themePurple focus:outline-none focus:border-themeBlue"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-themeBlue">Description:</label>
            <textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-themePurple focus:outline-none focus:border-themeBlue"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-themePurple text-themeLightGray px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
