import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + '...';
}

function ViewCoursesUser() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of courses from your server when the component mounts
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:8080/courses/getCourses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const toggleReadMore = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId
          ? { ...course, showMore: !course.showMore }
          : course
      )
    );
  };

  const ViewTute = async (courseId, courseName) => {
    navigate(`/viewTutorials/${courseId}/${courseName}`);
  }

  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-blue-200 min-h-screen p-8">
      <button
        onClick={() => {
          navigate('/userHome');
        }}
        className="bg-themeBlue text-white px-2 py-1 rounded-md hover-bg-themePurple transition duration-300 inline-block mr-2"
        type="button"
      >
        Back
      </button>

      <div className="flex justify-between items-center mb-4">
      <div></div>
      <input
        type="text"
        placeholder="Search courses"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-3 py-1 border rounded-full"
      />
</div>
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-indigo-800 mb-1">Courses List
        {/* Search bar */}
        <div style={{ display: "flex",  alignItems: "center", height: "10vh" }}>
 

</div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-purple-500 mb-2">{course.coursename}</h3>
                <p className="text-gray-700">
                  {course.showMore
                    ? course.description
                    : truncateDescription(course.description, 150)}{' '}
                  {course.description.length > 150 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => toggleReadMore(course._id)}
                    >
                      {course.showMore ? '...Read Less' : '...Read More'}
                    </span>
                  )}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => ViewTute(course._id, course.coursename)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover-bg-blue-700 transition duration-300 inline-block mr-2"
                  >
                    View Tute
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

export default ViewCoursesUser;
