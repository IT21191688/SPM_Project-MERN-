import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function UpdateTutorial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutorialData, setTutorialData] = useState({
    title: '',
    description: '',
    courseid: '', // Initialize courseid as an empty string
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tutorialResponse = await axios.get(`/tutorials/getT/${id}`);
        const tutorial = tutorialResponse.data;
        setTutorialData({
          title: tutorial.title,
          description: tutorial.description,
          courseid: tutorial.courseid,
        });

        const coursesResponse = await axios.get('http://localhost:8080/courses/getCourses');
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorialData({
      ...tutorialData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/tutorials/updateT/${id}`, tutorialData);
      navigate(`/tutorials/${id}`);
    } catch (error) {
      console.error('Error updating tutorial:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Update Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold text-blue-900 mb-2">
            Tutorial Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={tutorialData.title}
            onChange={handleChange}
            className="border border-blue-500 rounded-lg py-2 px-3 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold text-blue-900 mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={tutorialData.description}
            onChange={handleChange}
            className="border border-blue-500 rounded-lg py-2 px-3 w-full h-32"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseid" className="block font-semibold text-blue-900 mb-2">
            Select a Course:
          </label>
          <select
            id="courseid"
            name="courseid"
            value={tutorialData.courseid || ''} // Initialize with an empty string
            onChange={handleChange}
            className="border border-blue-500 rounded-lg py-2 px-3 w-full"
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.coursename}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Update Tutorial
          </button>
          <Link to={`/tutorials/${id}`} className="ml-4 text-blue-500 hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateTutorial;
