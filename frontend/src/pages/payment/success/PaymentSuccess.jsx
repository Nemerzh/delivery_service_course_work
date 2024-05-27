import React, {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {axiosInstance} from "../../../api/apiConfig";
import * as style from "./paymentsuccess.module.css"

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
                order_id: orderId
            });
            if (response.data.success) {
                setMessage('Замовлення успішно оновлено');
                const response = await axiosInstance.post('api/bill', {
                    order_id: orderId
                });
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
    }, []);  // Empty array means this effect runs only once after the first render

    return (
        <div className={style["payment-success-container"]}>
            <h2>Оплата успішна!</h2>
            <div className={style["payment-details"]}>
                <p>Замовлення #{orderId}</p>
                <p>Успішно оплачене</p>
                <p>Електроний чек надіслано на пошту</p>
            </div>
            <button className={style["payment-button"]} onClick={() => window.location.href = '/'}>
                Повернутися на головну
            </button>
        </div>
    );
}
