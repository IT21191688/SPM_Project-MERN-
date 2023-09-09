import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateCourse() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false); // State to manage the update process

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await axios.get(`http://localhost:8080/courses/get/${courseId}`);
        setCourseData({
          coursename: response.data.course.coursename,
          description: response.data.course.description,
        });
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // Set updating state to true while the request is in progress
    try {
      await axios.put(`http://localhost:8080/courses/update/${courseId}`, courseData);
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setIsUpdating(false); // Reset updating state when the request is completed
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-27005D">Update Course</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="coursename" className="block font-semibold text-27005D mb-2">
            Course Name:
          </label>
          <input
            type="text"
            id="coursename"
            name="coursename"
            value={courseData.coursename}
            onChange={handleChange}
            className="border border-27005D rounded-lg py-2 px-3 w-full focus:outline-none focus:border-9400FF"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold text-27005D mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="border border-27005D rounded-lg py-2 px-3 w-full h-32 focus:outline-none focus:border-9400FF"
          />
        </div>
        <div>
          <button
            type="submit"
            className={`bg-9400FF text-white py-2 px-4 rounded-lg hover:bg-AED2FF transition duration-300 ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Course'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCourse;