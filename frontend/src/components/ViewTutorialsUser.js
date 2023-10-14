import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewTutorialsUser() {
  const { courseId, courseName } = useParams();

  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch the list of tutorials from your server when the component mounts
    async function fetchTutorials() {
      try {
        const response = await axios.get('http://localhost:8080/tutorials/allT'); // Adjust the endpoint based on your API route

        const filteredTutorials = response.data.filter(tutorials => tutorials.courseid === courseId);

        setTutorials(filteredTutorials);
        console.log(filteredTutorials);

      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    }

    fetchTutorials();
  }, []);

  // Function to toggle the visibility of additional content for a specific tutorial
  const toggleReadMore = (tutorialId) => {
    setTutorials((prevTutorials) =>
      prevTutorials.map((tutorial) =>
        tutorial._id === tutorialId
          ? { ...tutorial, showMore: !tutorial.showMore }
          : tutorial
      )
    );
  };

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <button
                    onClick={() => {
                    // Use the navigate function to redirect back to ViewCoursesAdmin
                    navigate('/viewCourses'); // Adjust the route path as needed
                  }}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                    type="button"
                  >
                     Back
                  </button>
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Tutorials for {courseName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-purple-500 mb-2">{tutorial.title}</h3>
                <p className="text-gray-700">
                  {tutorial.showMore
                    ? tutorial.description // Show the full description when showMore is true
                    : tutorial.description.slice(0, 150) + '...'}{' '}
                  {/* Truncate the description to 150 characters */}
                  {tutorial.description.length > 150 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => toggleReadMore(tutorial._id)}
                    >
                      {tutorial.showMore ? '...Read Less' : '...Read More'}
                    </span>
                  )}
                </p>

                <br />

                <button
                  onClick={() => {
                    window.open(`http://localhost:8080/${tutorial.pdf}`, '_blank');
                  }}
                  className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                  type="button"
                >
                  View Tute
                </button>

                <button
                  onClick={() => {
                    window.open(`http://localhost:3000/editor`, '_blank');
                  }}
                  className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                  type="button"
                >
                  Code Editor
                </button>


              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTutorialsUser;
