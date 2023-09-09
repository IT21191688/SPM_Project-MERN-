import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewCoursesUser() {
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

  return (
    <div className="bg-AED2FF min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-27005D mb-6">Courses List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-9400FF mb-2">{course.coursename}</h3>
                <p className="text-gray-700">{course.description}</p>
                <Link
                  to={`/courses/update/${course._id}`} // Use the course ID to create the update URL
                  className="mt-4 bg-27005D text-white px-4 py-2 rounded-md hover:bg-9400FF transition duration-300 inline-block"
                >
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCoursesUser;
