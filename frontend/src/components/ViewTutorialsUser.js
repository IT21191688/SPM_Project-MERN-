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

  return (
    <div>
      <h2 className="text-3xl font-semibold">Tutorials List</h2>
      <ul>
        {tutorials.map((tutorial) => (
          <li key={tutorial._id}>
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTutorialsUser;
