import React, {useEffect, useState} from 'react'
import {Navigate, useNavigate} from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import useLogout from "../../hooks/useLogout"
import useUser from '../../hooks/useUser'
import * as styles from './shoppingcart.module.css'
import {axiosInstance} from "../../api/apiConfig";
import {toast} from "react-toastify";

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {red} from '@mui/material/colors';

export default function User() {

    const {user} = useAuth()
    const [dishes, setDishes] = useState([]);

    const navigate = useNavigate()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])


    useEffect(() => {
        async function fetchDeliveryAddress() {
            if (user.id) {
                try {
                    const response = await axiosInstance.get(`api/user-ready-dishes/${user.id}`);
                    setDishes(response.data);
                } catch (error) {
                    console.error('Помилка при отриманні товарів у кошик', error);
                }
            }
        }

        fetchDeliveryAddress();
    }, [user.id]); // Вказуємо, що ефект має запускатися лише при зміні user.id

    async function onAddClick(dishToOrderId) {
        try {
            const response = await axiosInstance.post(`api/update_dish_to_order/${dishToOrderId}`, JSON.stringify({
                add_or_minus: "add"
            }));
        } catch (error) {
            setLoading(false)
        }
        const response = await axiosInstance.get(`api/user-ready-dishes/${user.id}`);
        setDishes(response.data);
    }

    async function onMinusClick(dishToOrderId) {
        try {
            const response = await axiosInstance.post(`api/update_dish_to_order/${dishToOrderId}`, JSON.stringify({
                add_or_minus: "minus"
            }));
        } catch (error) {
            setLoading(false)
        }
        const response = await axiosInstance.get(`api/user-ready-dishes/${user.id}`);
        setDishes(response.data);
    }

    async function onDeleteClick() {
        try {
            const response = await axiosInstance.delete(`api/delete-order/${user.id}`);
            await toMenu();
            return response.data;
        } catch (error) {
            toast.error("Order not found");
            throw error;
        }

    }

    async function toMenu() {
        window.location.href = '/main';
    }

    async function toCheckOut() {
        if (dishes.length !== 0) {
            window.location.href = '/checkout';
        } else {
            toast.error("Ваш кошик пустий");
        }
    }

    function calculateTotalPrice(dishes) {
        let sum = 0;
        dishes.forEach(dish => {
            sum += dish.count * dish.dish.price * (1 - dish.dish.discount);
        });
        return sum;
    }


    return (
        <div className={styles["main-content"]}>
            <h3>Кошик</h3>
            <div className={styles["shadow-container"]}>
                <div className={styles["cart-container"]}>
                    <div className={styles["top-part-cart-container"]}>
                        <h4 className={styles["h4-cart"]}>FoodDelivery</h4>
                        <DeleteIcon className={styles["delete-icon"]} fontSize={"large"}
                                    onClick={onDeleteClick}/>
                    </div>

                    {dishes.map(dish =>
                        (
                            <div className={styles["product-card"]}>
                                <div className={styles["card-text"]}>
                                    <h6>{dish.count} x {dish.dish.category.category_name}: {dish.dish.product_name}</h6>
                                    <h7>{dish.dish.price * (1 - dish.dish.discount)} ₴</h7>
                                </div>
                                <div className={styles["card-control"]}>
                                    <AddCircleIcon className={styles["control-item"]} color="success"
                                                   onClick={() => onAddClick(dish.id)}/>
                                    <RemoveCircleIcon className={styles["control-item"]} sx={{color: red[500]}}
                                                      onClick={() => onMinusClick(dish.id)}/>
                                </div>
                            </div>
                        ))}
                    <h5>Чек: {calculateTotalPrice(dishes)} ₴</h5>
                </div>
                <div className={styles["btn-container"]}>
                    <button disabled={loading} type='button' className={styles["to-order"]}
                            onClick={toCheckOut}>Оформити
                    </button>
                    <button disabled={loading} type='button' className={styles["to-menu"]} onClick={toMenu}>Назад до
                        меню
                    </button>

                </div>
            </div>
        </div>
    )
}
