import React, {useState, useEffect} from 'react';
import * as styles from './courier.module.css';
import {axiosInstance} from '../../api/apiConfig';
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

export default function AvailableOrders() {
    const [deliveries, setDeliveries] = useState([]);
    const {user} = useAuth();
    const getUser = useUser();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        const fetchCourierId = async () => {
            try {
                const response = await axiosInstance.get(`/api/courier`);
                const filteredOrders = response.data.filter(courier => courier.user === user.id);
                
                if (filteredOrders[0] && filteredOrders[0].id) {
                    fetchDeliveries(filteredOrders[0].id);
                }

            } catch (error) {
                console.error('Error fetching courier:', error);
            }
        };

        const fetchDeliveries = async (courierId) => {
            try {
                const response = await axiosInstance.get(`/api/delivery`);
                const filteredDeliveries = response.data.filter(delivery => delivery.courier === courierId);
                const filteredDeliveriesStatus = filteredDeliveries.filter(delivery => delivery.delivery_status === 'in_delivery');
                setDeliveries(filteredDeliveriesStatus);

            } catch (error) {
                console.error('Error fetching deliveries:', error);
            }
        };

        if (user && user.id) {
            fetchCourierId();
        }
    }, [user]);

    const handleCompleteDelivery = async (deliveryId) => {
        try {
            console.log(deliveryId)
            await axiosInstance.put(`/api/delivery/${deliveryId}`, {delivery_status: 'delivered'});
        } catch (error) {
            console.error('Error completing delivery:', error);
        }
    };


    return (
        <div className={styles["courier-page"]}>
            <div className={styles["courier-container"]}>
                <h1>Доступні доставки</h1>
                <hr/>
                {deliveries.map(delivery => (
                    <div key={delivery.id} className={styles["order-cell"]}>
                        <div className={styles["text-cell"]}>
                            Номер доставки: {delivery.id} <br/>
                            Коментар: {delivery.delivery_address} <br/>
                        </div>
                        <div className={styles["button-container"]}>
                            <button className={styles.button}
                                    onClick={() => handleCompleteDelivery(delivery.id)}>Завершити
                            </button>
                            <button className={styles.button}>Скасувати</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
