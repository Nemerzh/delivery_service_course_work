import React, {useEffect, useState} from 'react';
import {axiosInstance} from "../../api/apiConfig";
import {useParams} from "react-router-dom";
import * as styles from './orderhistory.module.css';
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth()
    const getUser = useUser()


    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user.id) {
            axiosInstance.get(`api/order/${user.id}`)
                .then(response => {
                    setOrders(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    const parseDeliveryAddress = (comment) => {
        const match = comment.match(/Адреса доставки:\s*(.*)/);
        return match ? match[1] : 'Адреса не вказана';
    };

    if (loading) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className={styles['history-container']}>
            <h1>Історія Замовлень</h1>
            <table>
                <thead>
                <tr>
                    <th>Номер замовлення</th>
                    <th>Статус</th>
                    <th>Сума</th>
                    <th>Деталі</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.order_status}</td>
                        <td>{order.price.toFixed(2)} грн</td>
                        <td>
                            <a href={`order_history/detail/${order.id}`}>Деталі</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};