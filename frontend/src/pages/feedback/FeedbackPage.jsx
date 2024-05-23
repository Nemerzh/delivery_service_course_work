import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import '../../../static/css/feedback.css';
import * as styles from "../main/main.module.css";


function FeedbackPage() {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const commentsPerPage = 5;
    const {isLoggedIn} = useAuth();
    const minId = comments.length > 0 ? comments[comments.length - 1].id : null;
    const linkTo = isLoggedIn ? "/feedback/add" : "/auth/login";

    useEffect(() => {
        if (page > 1 && minId <= 1) {
            return;
        }

        const fetchComments = async () => {
            try {
                let url = `http://localhost:8000/api/feedback/last?page=${page}&limit=${commentsPerPage}`;

                if (page > 1) {
                    url += `&max_id=${minId}`;
                }

                const response = await axios.get(url);
                setComments(prevComments => [...prevComments, ...response.data]);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchComments();
    }, [page]);

    const handleLoadMore = () => {
        const minId = comments.length > 0 ? comments[comments.length - 1].id : null;

        if (minId > 1) {
            axios.get(`http://localhost:8000/api/feedback/last?max_id=${minId}`)
                .then(response => {
                    setComments(prevComments => [...prevComments, ...response.data]);
                })
                .catch(error => {
                    console.error('Error fetching feedbacks:', error);
                });
        }
    };


    return (
        <div className="feedback-page">

            <div className={styles.banner}>
                <div className={styles["banner-head"]}>
                    <img className={styles["head-logo"]} src="../../../static/images/3.png" alt="Fooddelivery"/>
                </div>
                <div className={styles["banner-body"]}>
                    <NavLink to="/main" className={styles["button-banner"]}>
                        Меню
                    </NavLink>
                    <a className={`${styles["button-banner"]} ${styles["active"]}`}>Відгуки</a>
                    <a href="#" className={styles["button-banner"]}>Історія</a>
                    <NavLink to="/info" className={`${styles["button-banner"]}`}>
                        Інфо
                    </NavLink>
                </div>
            </div>

            <div className="feedback-container">
                <h1>Відгуки</h1>
                <hr/>

                <NavLink to={linkTo} className="add-comment-cell">
                    Додати відгук
                </NavLink>

                {comments.map(comment => (
                    <div key={comment.id} className="comment-cell">
                        <div className="comment-header">
                            {`${comment.user_first_name} - ${comment.rating}/5`}
                        </div>
                        <hr/>
                        <div className="comment-text">
                            {comment.review_text}
                        </div>
                    </div>
                ))}

                {minId > 1 && (
                    <button onClick={handleLoadMore} className="load-more-button">
                        Ще
                    </button>
                )}
            </div>
        </div>
    );
}

export default FeedbackPage;