import React, {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {axiosInstance} from "../api/apiConfig";

export default function PaymentSuccess() {
    const {orderId} = useParams();
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('paymentId');
    const token = searchParams.get('token');
    const PayerID = searchParams.get('PayerID');

    const updateOrderStatus = async () => {
        try {
            const response = await axiosInstance.post('api/payments/update_order/', {
                order_id: orderId,
            });
            if (response.data.success) {
                setMessage('Замовлення успішно оновлено');
            } else {
                setMessage('Помилка при оновленні замовлення');
            }
        } catch (error) {
            console.error('Помилка при оновленні замовлення:', error);
            setMessage('Помилка при оновленні замовлення');
        }
    };

    useEffect(() => {
        updateOrderStatus();
    }, []);  // Порожній масив означає, що цей ефект виконується лише один раз після першого рендеру

    return (
        <div>
            <h2>Оплата успішна!</h2>
            <p>Payment ID: {paymentId}</p>
            <p>Token: {token}</p>
            <p>Payer ID: {PayerID}</p>
            <p>{message}</p>
        </div>
    );
};
