import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/selectedPost.css'; // Import the separate CSS file for SelectedPost
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';



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
        <div className="container selected-post">
            <h2 className="selected-post-title"></h2>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>

            {/* Use FontAwesome icons for Delete Post and Update Post */}
            <button className="btn post-button" onClick={handleDeletePost}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="btn post-button" onClick={handleUpdatePost}>
                <FontAwesomeIcon icon={faEdit} />
            </button>

            <hr />

            <h1>Reviews and Comments</h1>

            <div className="comment-container">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        {/* Comment content */}
                        <p className="comment-text">{comment.text}</p>
                        <button className="btn post-button" onClick={() => handleDeleteComment(comment._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="btn post-button" onClick={() => handleEditComment(comment._id, comment.text)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn post-button" onClick={() => handleReplyComment(comment._id)}>
                            Reply
                        </button>

                        {/* Reply textarea and button */}
                        {comment._id === editComment.id && (
                            <div>
                                <textarea
                                    value={editComment.text}
                                    onChange={(e) => setEditComment({ id: comment._id, text: e.target.value })}
                                    rows="4"
                                    className="form-control comment-edit-textarea"
                                />
                                <button className="btn post-button" onClick={() => handleUpdateComment(comment._id)}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                            </div>
                        )}

                        {/* Display replies */}
                        {commentReplies[comment._id] && (
                            <div className="replies">
                                {commentReplies[comment._id].map((reply) => (
                                    <div key={reply.id} className="reply">
                                        <p className="reply-text">{reply.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="comment-add-container">
                <h3 className="post-title">Add a Comment</h3>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    rows="4"
                    className="form-control comment-add-textarea"
                    placeholder="Write a comment..."
                />
                <button className="btn post-button" onClick={handleSubmitComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );

}

export default SelectedPost;