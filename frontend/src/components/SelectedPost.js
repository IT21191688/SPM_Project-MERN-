import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/selectedPost.css'; // Import the separate CSS file for SelectedPost
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode'




function SelectedPost(props) {
    const { postId } = useParams();
    console.log(postId);
    //const postId = props.match.params.postId; // Get the post ID from the route params
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState({ id: null, text: '' });
    const [commentReplies, setCommentReplies] = useState({});
    const navigate = useNavigate();

    const [name, setName] = useState('');


    useEffect(() => {

        const fetchProfileDetails = async () => {
            const token = localStorage.getItem('token')
            const decoded = jwt(token);
            const userId = decoded.userId;

            try {


                const response = await axios.post("http://localhost:8080/auth/profile", { userId });

                setName(response.data.firstname + ' ' + response.data.lastname);

            } catch (error) {
                alert('Data Load Unsuccessfull' + error);
                console.log(error);
            }
        };

        fetchProfileDetails();



    }, [])


    useEffect(() => {

        // Fetch the selected post's details
        axios.get(`http://localhost:8080/api/posts/posts/${postId}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching post details:', error);
            });

        // Fetch comments related to the selected post
        axios.get(`http://localhost:8080/api/comments/posts/${postId}/comments`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, [postId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = () => {
        // Send a POST request to add a new comment
        axios.post(`http://localhost:8080/api/comments/posts/${postId}/comments`, {
            postId,
            text: newComment,
            name: name,
        })
            .then((response) => {
                // Update the comments state with the newly added comment
                setComments([...comments, response.data]);
                // Clear the comment input field
                setNewComment('');
            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    const handleDeleteComment = (commentId) => {
        // Send a DELETE request to delete the comment
        axios.delete(`http://localhost:8080/api/comments/comments/${commentId}`)
            .then(() => {
                // Remove the deleted comment from the comments state
                const updatedComments = comments.filter((comment) => comment._id !== commentId);
                setComments(updatedComments);
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });
    };

    const handleEditComment = (commentId, text) => {
        // Set the comment ID and text in the editComment state
        setEditComment({ id: commentId, text });
    };

    const handleUpdateComment = (commentId) => {
        // Send a PUT or PATCH request to update the comment
        axios.put(`http://localhost:8080/api/comments/comments/${commentId}`, {
            text: editComment.text,
        })
            .then(() => {
                // Update the UI with the edited comment text
                const updatedComments = comments.map((comment) => {
                    if (comment._id === commentId) {
                        return { ...comment, text: editComment.text };
                    }
                    return comment;
                });
                setComments(updatedComments);
                // Clear the editComment state
                setEditComment({ id: null, text: '' });
            })
            .catch((error) => {
                console.error('Error updating comment:', error);
            });
    };

    const handleDeletePost = () => {
        // Send a GET request to fetch all comments related to the post
        axios.get(`http://localhost:8080/api/comments/posts/${postId}/comments`)
            .then((response) => {
                const commentsToDelete = response.data;
                // Delete each comment one by one
                Promise.all(
                    commentsToDelete.map((comment) =>
                        axios.delete(`http://localhost:8080/api/comments/comments/${comment._id}`)
                    )
                )
                    .then(() => {
                        // After deleting all comments, delete the post itself
                        axios.delete(`http://localhost:8080/api/posts/posts/${postId}`)
                            .then(() => {
                                // Redirect to the list of all posts or perform any other action
                                props.history.push('/'); // You can adjust the redirection URL as needed
                            })
                            .catch((error) => {
                                console.error('Error deleting post:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error deleting comments:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    function handleUpdatePost() {
        navigate(`/editpost/${postId}`);
    }

    const addReplyToComment = (commentId, replyText) => {
        // Create a new reply object
        const newReply = {
            id: new Date().getTime(), // Generate a unique ID for the reply
            text: replyText,
        };

        // Update the commentReplies state
        setCommentReplies({
            ...commentReplies,
            [commentId]: [...(commentReplies[commentId] || []), newReply],
        });
    };

    const handleReplyComment = (commentId) => {
        // Display the reply textarea for the selected comment
        setEditComment({ id: commentId, text: '' });
    };

    const handleAddReply = (commentId) => {
        // Get the reply text from the state
        const replyText = editComment.text;

        // Add the reply to the comment
        addReplyToComment(commentId, replyText);

        // Clear the reply textarea
        setEditComment({ id: null, text: '' });
    };


    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-semibold text-themeBlue mb-4">{post.title}</h1>
                <p className="text-themeBlue">{post.content}</p>
                <br /><br />
                <div className="blog-author">
                    Author: {post.name}
                </div>

                <div className="flex mt-4">
                    <button
                        className="btn post-button mr-4 text-themePurple hover:text-themeBlue"
                        onClick={handleDeletePost}
                    >
                        Delete Post
                    </button>
                    <button
                        className="btn post-button text-themePurple hover:text-themeBlue"
                        onClick={handleUpdatePost}
                    >
                        Edit Post
                    </button>
                </div>

                {/* Border removed here */}
                <hr className="my-6" />

                <h2 className="text-2xl font-semibold text-themeBlue">Reviews and Comments</h2>

                {/* Remove border from comment-container */}
                <div className="comment-container mt-4">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment mb-6">
                            <p className="text-themeBlue">{comment.text}</p>
                            <br/>
                            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#27005D' }}>
                                Author: {comment.name}
                            </div>
                            <div className="flex mt-2">
                                <button
                                    className="btn post-button mr-2 text-themePurple hover:text-themeBlue"
                                    onClick={() => handleDeleteComment(comment._id)}
                                >
                                    Delete Comment
                                </button>
                                <button
                                    className="btn post-button mr-2 text-themePurple hover:text-themeBlue"
                                    onClick={() => handleEditComment(comment._id, comment.text)}
                                >
                                    Edit Comment
                                </button>
                                <button
                                    className="btn post-button text-themePurple hover:text-themeBlue"
                                    onClick={() => handleReplyComment(comment._id)}
                                >
                                    Reply
                                </button>
                            </div>

                            {comment._id === editComment.id && (
                                <div className="mt-4">
                                    <textarea
                                        value={editComment.text}
                                        onChange={(e) => setEditComment({ id: comment._id, text: e.target.value })}
                                        rows="4"
                                        className="form-control comment-edit-textarea"
                                    />
                                    <button
                                        className="btn post-button mt-2 text-themePurple hover:text-themeBlue"
                                        onClick={() => handleUpdateComment(comment._id)}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}

                            {commentReplies[comment._id] && (
                                <div className="replies mt-4">
                                    {commentReplies[comment._id].map((reply) => (
                                        <div key={reply.id} className="reply mb-2">
                                            <p className="text-themeBlue">{reply.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="comment-add-container mt-6">
                    <h2 className="text-2xl font-semibold text-themeBlue">Add a Comment</h2>
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        rows="4"
                        className="form-control comment-add-textarea mt-2"
                        placeholder="Write a comment..."
                    />
                    <button
                        className="btn post-button mt-2 text-themePurple hover:text-themeBlue"
                        onClick={handleSubmitComment}
                    >
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SelectedPost;