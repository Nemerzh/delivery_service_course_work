import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import useLogout from "../../hooks/useLogout"
import useUser from '../../hooks/useUser'
import * as styles from './profile.module.css'
import {axiosInstance} from "../../api/apiConfig";
import {toast} from "react-toastify";

export default function User() {

    const {user} = useAuth()

    const navigate = useNavigate()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)
    const getUser = useUser()

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [delivery_address, setDeliveryAddress] = useState();
    const [password, setPassword] = useState();

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleDeliveryAddressChange = (event) => {
        setDeliveryAddress(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        if (!first_name && !last_name && !phone_number && !delivery_address && !password) {
            toast.error("Будь ласка, заповніть хоча б одне поле");
            return;
        }

        setLoading(true)

        try {
            const response = await axiosInstance.put(`api/update_profile/${user.id}`, JSON.stringify({
                first_name,
                last_name,
                phone_number,
                delivery_address,
                password
            }));

            toast.success("Дані профілю успішно оновлено!");

            setLoading(false)

            navigate(fromLocation, {replace: true})

        } catch (error) {
            setLoading(false)

        }
    }


    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        async function fetchDeliveryAddress() {
            if (user.id) {
                try {
                    const response = await axiosInstance.get(`api/customer/${user.id}`);
                    setDeliveryAddress(response.data.delivery_address || '');
                } catch (error) {
                    console.error('Помилка при отриманні адреси доставки:', error);
                }
            }
        }

        fetchDeliveryAddress();
    }, [user.id]); // Вказуємо, що ефект має запускатися лише при зміні user.id


    async function onLogout() {
        setLoading(true)

        await logout()
        navigate('/')
    }

    return (
        <div className={styles["main-content"]}>
            <h3 className={styles["label-profile"]}>Профіль</h3>
            <div className={styles["profile-container"]}>
                <img className={styles.img} src="../../../static/images/profile.png" alt=""/>
                <form onSubmit={onSubmitForm} className={styles.form}>
                    <div className={styles["input-fields"]}>
                        <label htmlFor="first-name">Ім'я</label>
                        <input type="text"
                               placeholder='First name'
                               autoComplete='off'
                               className={styles["param-field"]}
                               id="first-name"
                               defaultValue={user.first_name}
                               onChange={handleFirstNameChange}/>
                    </div>
                    <div className={styles["input-fields"]}>
                        <label htmlFor="last-name">Прізвище</label>
                        <input type="text"
                               placeholder='Last name'
                               autoComplete='off'
                               className={styles["param-field"]}
                               id="last-name"
                               defaultValue={user.last_name}
                               onChange={handleLastNameChange}/>
                    </div>
                    <div className={styles["input-fields"]}>
                        <label htmlFor="phone-number">Номер телефону</label>
                        <input type="tel"
                               placeholder="+380ххххххххх"
                               autoComplete='off'
                               pattern="\+380\d{9}"
                               className={styles["param-field"]}
                               id="phone-number"
                               defaultValue={user.phone_number}
                               onChange={handlePhoneNumberChange}/>
                    </div>
                    <div className={styles["input-fields"]}>
                        <label htmlFor="delivery_adress">Адреса доставки</label>
                        <input type="text"
                               placeholder='Будь ласка, введіть адресу у форматі: вулиця, будинок'
                               autoComplete='street-address'
                               className={styles["param-field"]}
                               id="delivery_adress"
                               defaultValue={delivery_address}
                               onChange={handleDeliveryAddressChange}/>
                    </div>
                    <div className={styles["input-fields"]}>
                        <label htmlFor="password">Новий пароль</label>
                        <input type="password"
                               placeholder='New password'
                               autoComplete='off'
                               className={styles["param-field"]}
                               id="password"
                               onChange={handlePasswordChange}/>
                    </div>

                    <div className={styles["button-container"]}>
                        <button disabled={loading} type="submit" className={styles.btn}>Зберегти</button>
                        <button disabled={loading} type='button' onClick={onLogout}
                                className={styles.btn}>Logout
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
