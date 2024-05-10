import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import useUser  from "../../hooks/useUser";

function FeedbackAdd() {
    const { user } = useAuth();
    const history = useHistory();

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    const [reviewText, setReviewText] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const reviewDate = new Date().toISOString();

        const feedbackData = {
            rating,
            review_text: reviewText,
            review_date: reviewDate,
            user_first_name: user?.first_name // WTF
        };

        try {
            await axios.post('http://localhost:8000/api/feedback/', feedbackData);
            console.log('Review submitted successfully.');

            history.push('/feedback/list');
        } catch (error) {
            console.error('Error submitting review:', error);
        }

        setRating(null);
        setReviewText('');
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    return (
        <div className="feedback-page2">
            <div className="feedback-container2">
                <h1>Add feedback</h1>
                <hr />

                <div>
                    {[...Array(totalStars)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={currentRating}
                                    onChange={() => setRating(currentRating)}
                                />
                                <span
                                    className="star"
                                    style={{
                                        color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                    }}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                >
                                    &#9733;
                                </span>
                            </label>
                        );
                    })}
                </div>

                <form onSubmit={handleFormSubmit}>
                    <textarea
                        value={reviewText}
                        onChange={handleReviewTextChange}
                        placeholder="Write your feedback here..."
                        rows="5"
                        cols="50"
                        className="feedback-textarea"
                        required
                    />
                    <br />

                    <div className="button-container">
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                        <NavLink to="/feedback/list" className="submit-button">
                            Back
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackAdd;

