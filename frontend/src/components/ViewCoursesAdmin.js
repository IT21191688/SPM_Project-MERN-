import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + '...';
}

function ViewCoursesAdmin() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
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

  const filteredCourses = courses.filter((course) =>
    course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/courses/delete/${courseId}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
      navigate('/getCourseAdmin');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const AddTute = async (courseId, courseName) => {
    navigate(`/createTutorial/${courseId}/${courseName}`);
  }

  const ViewTute = async (courseId, courseName) => {
    navigate(`/getTutorialAdmin/${courseId}/${courseName}`);
  }

  return (
    <div className="bg-blue-200 min-h-screen p-8">
      <button
        onClick={() => {
          navigate('/adminHome');
        }}
        className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
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
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Courses List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div key={course._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{course.coursename}</h3>
                <p className="text-gray-700">
                  {course.showMore
                    ? course.description
                    : truncateDescription(course.description, 150)}
                  {course.description.length > 150 && (
                    <span
                      className="text-blue-700 cursor-pointer"
                      onClick={() => toggleReadMore(course._id)}
                    >
                      {course.showMore ? '...Read Less' : '...Read More'}
                    </span>
                  )}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/courses/update/${course._id}`}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 inline-block mr-2"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover-bg-red-600 transition duration-300 inline-block mr-2"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => AddTute(course._id, course.coursename)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 inline-block mr-2"
                  >
                    Add Tute
                  </button>

                  <button
                    onClick={() => ViewTute(course._id, course.coursename)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 inline-block mr-2"
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

export default ViewCoursesAdmin;
