import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  return (
    <div className="bg-AED2FF min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-27005D mb-6">Tutorials List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-9400FF mb-2">{tutorial.title}</h3>
                <p className="text-gray-700">{tutorial.description}</p>
                <Link
                  to={`/tutorials/update/${tutorial._id}`} // Use the tutorial ID to create the update URL
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

export default ViewTutorialsUser;
