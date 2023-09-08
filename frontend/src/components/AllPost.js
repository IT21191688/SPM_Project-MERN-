import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/allPost.css'; // Import custom CSS for styling


function AllPost() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts/posts')
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
    if (readMoreBtn.innerHTML === 'Read More') {
      readMoreBtn.innerHTML = 'Read Less';
    } else {
      readMoreBtn.innerHTML = 'Read More';
    }
  };

  return (
    <div className="container all-post">
      <h2 className="mt-5 mb-4">Explore the Reviews</h2>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <a
                    href="#"
                    onClick={() => navigateToSelectedPost(post._id)}
                    className="post-title-link"
                  >
                    {post.title}
                  </a>
                </h5>
                <p className="card-text">
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
                        className="show-more-btn"
                        onClick={() => handleReadMoreClick(post._id)}
                      >
                        ...Read More
                      </span>
                    </>
                  ) : (
                    post.content
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary create-post-btn"
          onClick={() => {
            navigate(`/createpost/`);
          }}
        >
          Create Post
        </button>
      </div>
    </div>
  );
}

export default AllPost;