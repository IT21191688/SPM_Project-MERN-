import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/selectedPost.css';
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50, // Adjust the width of the logo as needed
        height: 50, // Adjust the height of the logo as needed
        marginRight: 10,
    },
    websiteName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    generatedDate: {
        marginLeft: 'auto', // Align the generated date to the right
        fontSize: 12,
    },
    postTitle: {
        fontSize: 24,
        marginBottom: 10,
    },
    postContent: {
        fontSize: 14,
        marginBottom: 20,
    },
    commentContainer: {
        marginBottom: 10,
    },
    commentText: {
        fontSize: 12,
        marginBottom: 5, // Add margin to separate comments
    },
    commentAuthor: {
        fontSize: 12,
        color: 'blue', // Change the author's text color to blue
    },
    commentDivider: {
        height: 1,
        backgroundColor: 'gray', // Add a gray line to divide comments
        marginBottom: 5, // Add margin below the divider
    },
});




function SelectedPost(props) {

    const { postId } = useParams();
    console.log(postId);
    //const postId = props.match.params.postId; // Get the post ID from the route params
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState({ id: null, text: '' });
    const [commentReplies, setCommentReplies] = useState({});
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [showPDFViewer, setShowPDFViewer] = useState(false);

    const LogoImage = () => (
        <Image
            src='../images/logo.png' // Replace with the path to your logo image
            style={styles.logo}
        />
    );

    const Header = () => (
        <View style={styles.header}>
            <LogoImage />
            <Text style={styles.websiteName}>DOT CODES</Text>
            <Text style={styles.generatedDate}>Generated on: {new Date().toLocaleDateString()}</Text>
        </View>
    );


    const PDFDocument = ({ post, comments }) => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Header />
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <Text style={styles.commentContainer}>Comments:</Text>
                    {comments.map((comment) => (
                        <View key={comment._id} style={styles.commentContainer}>
                            <Text style={styles.commentText}>Comment: {comment.text}</Text>
                            <Text style={styles.commentAuthor}>Author: {comment.name}</Text>
                            <Text style={styles.commentDivider}></Text>
                        </View>
                    ))}
                </Page>
            </Document>
        );
    };


    const generatePDF = () => {
        setShowPDFViewer(true);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth', // You can also use 'auto' for instant scrolling
        });
    };

    const sortedComments = comments.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });



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
        const commentToDelete = comments.find(comment => comment._id === commentId);

        // Check if the logged-in user is the author of the comment
        if (commentToDelete.name === name) {
            // Show a confirmation dialog
            const shouldDelete = window.confirm("Are you sure you want to delete this comment?");

            if (shouldDelete) {
                setItemToDelete('comment');
                setShowDeleteConfirmation(true);

                // Proceed with deletion
                axios.delete(`http://localhost:8080/api/comments/comments/${commentId}`)
                    .then(() => {
                        const updatedComments = comments.filter((comment) => comment._id !== commentId);
                        setComments(updatedComments);
                    })
                    .catch((error) => {
                        console.error('Error deleting comment:', error);
                    });
            }
        } else {
            alert('Only authors can delete comments');
        }
    };



    const handleEditComment = (commentId, text) => {
        const commentToEdit = comments.find(comment => comment._id === commentId);
        // Check if the logged-in user is the author of the comment
        if (commentToEdit.name === name) {
            setEditComment({ id: commentId, text });
        } else {
            alert('Only authors can edit comments')
        }
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
        // Check if the logged-in user is the author of the post
        if (post.name === name) {
            // Show a confirmation dialog
            const shouldDelete = window.confirm("Are you sure you want to delete this post?");

            if (shouldDelete) {
                setItemToDelete('post');
                setShowDeleteConfirmation(true);

                axios.get(`http://localhost:8080/api/comments/posts/${postId}/comments`)
                    .then((response) => {
                        const commentsToDelete = response.data;
                        Promise.all(
                            commentsToDelete.map((comment) =>
                                axios.delete(`http://localhost:8080/api/comments/comments/${comment._id}`)
                            )
                        )
                            .then(() => {
                                axios.delete(`http://localhost:8080/api/posts/posts/${postId}`)
                                    .then(() => {
                                        navigate('/allpost');
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
            }
        } else {
            alert('Only authors can delete posts');
        }
    };


    const handleUpdatePost = () => {
        // Check if the logged-in user is the author of the post
        if (post.name === name) {
            navigate(`/editpost/${postId}`);
        } else {
            alert('Only authors can edit posts')
        }
    };

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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h1 className="text-3xl font-semibold text-themeBlue mb-4">{post.title}</h1>
                    <button
                        className="btn post-button text-themePurple hover:text-themeBlue"
                        onClick={generatePDF}
                    >
                        Download PDF
                    </button>
                </div>

                <pre style={{ whiteSpace: 'pre-wrap' }}>{post.content}</pre>
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

                {/* Remove border from comment-container */}
                <div className="comment-container mt-4">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment mb-6">
                            <p className="text-themeBlue">{comment.text}</p>
                            <br />
                            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#27005D', opacity: '0.7' }}>
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





                {showPDFViewer && (
                    <div className="pdf-viewer">
                        <PDFViewer width="100%" height="500">
                            <PDFDocument post={post} comments={sortedComments} />
                        </PDFViewer>
                    </div>
                )}
            </div>
        </div>
    );

}

export default SelectedPost;