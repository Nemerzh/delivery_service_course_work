import React, {useState} from 'react';
import {axiosInstance} from "../../../api/apiConfig";
import {useParams} from "react-router-dom";
import * as styles from './paymentform.module.css';

export default function PaymentForm() {
    const {orderId} = useParams();  // Отримання order_id з URL параметрів
    const {totalPrice} = useParams();  // Отримання order_id з URL параметрів
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        try {
            const response = await axiosInstance.post('api/payments/create_payment/', {
                order_id: orderId
            });
            if (response.data.approval_url) {
                window.location.href = response.data.approval_url;  // Перенаправлення на PayPal
            } else {
                setMessage('Помилка при створенні платежу');
            }
        } catch (error) {
            console.error('Помилка при створенні платежу:', error);
            setMessage('Помилка при створенні платежу');
        }
    };

    return (
        <div className={styles["payment-container"]}>
            <h1>Оплата</h1>
            <h5>Замовлення #{orderId}</h5>
            <h5>На суму {totalPrice} грн</h5>
            <button className={styles['payment-button']} onClick={handlePayment}>Оплатити з PayPal</button>
            {message && <p>{message}</p>}
        </div>
    );
}
