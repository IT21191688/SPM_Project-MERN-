import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';




function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + '...';
}

function ViewTutorialsAdmin() {
  const { courseId, courseName } = useParams();

  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of tutorials from your server when the component mounts
    async function fetchTutorials() {
      try {
        const response = await axios.get('http://localhost:8080/tutorials/allT');

        // Filter tutorials based on courseId
        const filteredTutorials = response.data.filter(
          (tutorial) => tutorial.courseid === courseId
        );

        setTutorials(filteredTutorials);
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

  const handleUpdateTutorial = (tutorialId) => {
    navigate(`/tutorials/update/${tutorialId}/${courseId}/${courseName}`);
  };

  // Function to handle deleting a tutorial
  const handleDeleteTutorial = async (tutorialId) => {
    try {
      // Send a DELETE request to remove the tutorial based on tutorialId
      await axios.delete(`http://localhost:8080/tutorials/deleteT/${tutorialId}`);
      // After successful deletion, you can update the tutorials list or display a success message
      setTutorials((prevTutorials) =>
        prevTutorials.filter((tutorial) => tutorial._id !== tutorialId)
      );
    } catch (error) {
      console.error('Error deleting tutorial:', error);
    }
  };


  return (
    <div className="bg-AED2FF min-h-screen p-8">
      <button
                    onClick={() => {
                    // Use the navigate function to redirect back to ViewCoursesAdmin
                    navigate('/getCourseAdmin'); // Adjust the route path as needed
                  }}
                    className="bg-themeBlue text-white px-2 py-1 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                    type="button"
                  >
                     back
      </button>
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-themeBlue mb-6">
          Tutorials for {courseName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-themePurple mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-gray-700">
                  {tutorial.showMore
                    ? tutorial.description
                    : truncateDescription(tutorial.description, 150)}{' '}
                  {tutorial.description.length > 150 && (
                    <span
                      className="text-themeBlue cursor-pointer"
                      onClick={() => toggleReadMore(tutorial._id)}
                    >
                      {tutorial.showMore ? '...Read Less' : '...Read More'}
                    </span>
                  )}
                </p>
                <div className="mt-4">

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
                    onClick={() => handleUpdateTutorial(tutorial._id)}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteTutorial(tutorial._id)}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 inline-block"
                  >
                    Delete
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

export default ViewTutorialsAdmin;
