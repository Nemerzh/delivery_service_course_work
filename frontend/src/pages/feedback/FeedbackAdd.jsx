import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import useUser from '../../hooks/useUser';
import {axiosPrivateInstance} from "../../api/apiConfig";
import useAuth from "../../hooks/useAuth";


function FeedbackAdd() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const { user } = useAuth()
    const getUser = useUser()

    useEffect(()=>{
        getUser()
    },[])


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8000/api/feedback', {
                rating: rating,
                review_text: reviewText,
                user: user.id,
                review_date: new Date().toISOString(),
            });

            setRating(null);
            setReviewText('');

            window.location.href = '/feedback/list';
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
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
