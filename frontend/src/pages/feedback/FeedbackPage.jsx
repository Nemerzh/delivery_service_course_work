import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function FeedbackPage() {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const commentsPerPage = 5;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/feedback/last?page=${page}&limit=${commentsPerPage}`)
            .then(response => {
                setComments(prevComments => [...prevComments, ...response.data]);
            })
            .catch(error => {
                console.error('Error fetching feedbacks:', error);
            });
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <h1>Feedbacks</h1>
                <hr />
                <NavLink to="/feedback/add" className="add-comment-cell">
                    Add new comment
                </NavLink>

                {comments.map(comment => (
                    <div key={comment.id} className="comment-cell">
                        <div className="comment-header">
                            {`${comment.user.first_name} ${comment.user.last_name} - ${comment.rating}/5`}
                        </div>
                        <hr />
                        <div className="comment-text">
                            {comment.review_text}
                        </div>
                    </div>
                ))}

                <button onClick={handleLoadMore} className="load-more-button">
                    More
                </button>
            </div>
        </div>
    );
}

export default FeedbackPage;

