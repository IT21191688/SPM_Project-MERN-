import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewTutorialsUser() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    // Fetch the list of tutorials from your server when the component mounts
    async function fetchTutorials() {
      try {
        const response = await axios.post('http://localhost:8080/tutorials/allT'); // Adjust the endpoint based on your API route
        setTutorials(response.data);
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
    <div className="bg-blue-200 min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Tutorials List</h2>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTutorialsUser;
