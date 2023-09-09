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

  const [courses, setCourses] = useState([]);
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
      await axios.post('http://localhost:8080/tutorials/create', tutorialData);

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
          <label htmlFor="courseid" className="block font-semibold text-primary mb-2">
            Select a Course:
          </label>
          <select
            id="courseid"
            name="courseid"
            value={tutorialData.courseid}
            onChange={handleChange}
            className="border border-primary rounded-lg py-2 px-3 w-full"
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
