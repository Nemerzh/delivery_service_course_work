import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import * as styles from './orderdetail.module.css';
import {axiosInstance} from "../../api/apiConfig";

export default function OrderDetail() {
    const {orderId} = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.get(`api/order/detail/${orderId}`)
            .then(response => {
                setOrder(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
                setLoading(false);
            });
    }, [orderId]);

    if (loading) {
        return <div>Завантаження...</div>;
    }

    if (!order) {
        return <div>Замовлення не знайдено</div>;
    }

    return (
        <div className={styles['detail-container']}>
            <h1>Деталі Замовлення {order.id}</h1>
            <div className={styles['text-container']}>

                <p>Статус: {order.order_status}</p>
                <p>Сума: {order.price} грн</p>
                <p>Коментар: {order.comment}</p>
            </div>
            <button onClick={() => {
                window.location.href = '/order_history';
            }}>Повернутися
            </button>
        </div>
    );
};

