import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCourse() {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    courseid: '',
    coursename: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = {};
    if (!courseData.courseid.trim()) {
      validationErrors.courseid = 'Course ID is required';
    }
    if (!courseData.coursename.trim()) {
      validationErrors.coursename = 'Course Name is required';
    }
    if (!courseData.description.trim()) {
      validationErrors.description = 'Description is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
      navigate('/getCourseAdmin/');
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
            <label htmlFor="courseid" className="text-themeBlue">
              Course ID:
            </label>
            <input
              type="text"
              id="courseid"
              name="courseid"
              value={courseData.courseid}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md border-themePurple focus:outline-none focus:border-themeBlue ${
                errors.courseid ? 'border-red-500' : ''
              }`}
            />
            {errors.courseid && (
              <p className="text-red-500 text-xs mt-1">{errors.courseid}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="coursename" className="text-themeBlue">
              Course Name:
            </label>
            <input
              type="text"
              id="coursename"
              name="coursename"
              value={courseData.coursename}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md border-themePurple focus:outline-none focus:border-themeBlue ${
                errors.coursename ? 'border-red-500' : ''
              }`}
            />
            {errors.coursename && (
              <p className="text-red-500 text-xs mt-1">{errors.coursename}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-themeBlue">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md border-themePurple focus:outline-none focus:border-themeBlue ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-themePurple text-themeLightGray px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none"
            >
              Add Course
            </button>

            <button
                    onClick={() => {
                    // Use the navigate function to redirect back to ViewCoursesAdmin
                    navigate('/getCourseAdmin'); // Adjust the route path as needed
                  }}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                    type="button"
                  >
                     Back
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
