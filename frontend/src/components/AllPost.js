import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/allPost.css'; // Import the separate CSS file for SelectedPost

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/posts/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to navigate to the SelectedPost page with the post ID
  const navigateToSelectedPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleReadMoreClick = (postId) => {
    // Toggle the visibility of the read more content
    const readMoreContent = document.getElementById(`read-more-${postId}`);
    readMoreContent.classList.toggle('read-more');

    // Toggle the "Read More" button text
    const readMoreBtn = document.getElementById(`read-more-btn-${postId}`);
    if (readMoreBtn.innerHTML === '...Read More') {
      readMoreBtn.innerHTML = '...Read Less';
    } else {
      readMoreBtn.innerHTML = '...Read More';
    }
  };

  // Function to filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-themeLightGray py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-themeBlue mt-5 mb-4">Explore the Reviews</h2>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-themeLightGray rounded-md p-2 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div key={post._id}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-2">
                  <a
                    href="#"
                    onClick={() => navigateToSelectedPost(post._id)}
                    className="text-themeBlue hover:underline"
                  >
                    {post.title}

                  </a>
                </h5>
                <p className="text-gray-700">
                  {post.content.length > 200 ? (
                    <>
                      {post.content.slice(0, 200)}
                      <span
                        id={`read-more-${post._id}`}
                        className="read-more"
                      >
                        {post.content.slice(200)}
                      </span>
                      <span
                        id={`read-more-btn-${post._id}`}
                        className="text-themePurple cursor-pointer hover:text-themeBlue"
                        onClick={() => handleReadMoreClick(post._id)}
                      >
                        ...Read More
                      </span>
                    </>
                  ) : (
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{post.content}</pre>
                  )}
                </p>
                <br /><br />
                <div className="blog-author">
                  Author: {post.name}
                </div>

              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-themePurple hover:bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300"
            onClick={() => {
              navigate(`/createpost/`);
            }}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllPost;
