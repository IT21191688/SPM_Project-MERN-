import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewCoursesAdmin() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses from your server when the component mounts
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:8080/courses/getCourses'); // Adjust the endpoint based on your API route
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Send a DELETE request to remove the course based on courseId
      await axios.delete(`http://localhost:8080/courses/delete/${courseId}`); // Adjust the endpoint based on your API route
      // Optionally, you can update the courses list after deletion or display a success message
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="bg-AED2FF min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-themeBlue mb-6">Courses List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-themePurple mb-2">{course.coursename}</h3>
                <p className="text-gray-700">{course.description}</p>
                <div className="mt-4">
                  <Link
                    to={`/courses/update/${course._id}`}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 inline-block"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCoursesAdmin;
