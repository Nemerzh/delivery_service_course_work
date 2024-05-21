import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useUser from '../hooks/useUser';
import * as styles from './shoppingcartcheckout.module.css';
import {axiosInstance} from '../api/apiConfig';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import {format, addDays, setHours, setMinutes, addMinutes} from 'date-fns';
import {uk} from 'date-fns/locale';

export default function ShoppingCartCheckOut() {
    const {user} = useAuth();
    const [dishes, setDishes] = useState([]);
    const deliveryPrice = 60;
    const [selectedDate, setSelectedDate] = useState(getNext7Days()[0]); // Added state for the selected date
    const [selectedTime, setSelectedTime] = useState(getTimeIntervals()[0]); // Added state for the selected time
    const [dateAnchorEl, setDateAnchorEl] = useState(null);
    const [timeAnchorEl, setTimeAnchorEl] = useState(null);
    const [address, setAddress] = useState('');
    const [numberPeople, setNumberPeople] = useState(1);
    const [note, setNote] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();
    const logout = useLogout();
    const [loading, setLoading] = useState(false);
    const getUser = useUser();

    function onAddressChange(event) {
        setAddress(event.target.value);
    }

    function onNumberPeopleChange(event) {
        setNumberPeople(event.target.value);
    }

    function onNoteChange(event) {
        setNote(event.target.value);
    }

    const handleDateClick = (event) => {
        setDateAnchorEl(event.currentTarget);
    };

    const handleTimeClick = (event) => {
        setTimeAnchorEl(event.currentTarget);
    };

    const handleDateClose = (date) => {
        setDateAnchorEl(null);
        if (date) {
            setSelectedDate(date); // Update the selected date
        }
    };

    useEffect(() => {
        async function fetchDeliveryAddress() {
            if (user.id) {
                try {
                    const response = await axiosInstance.get(`api/customer/${user.id}`);
                    setAddress(response.data.delivery_address || '');
                } catch (error) {
                    console.error('Помилка при отриманні адреси доставки:', error);
                }
            }
        }

        fetchDeliveryAddress();
    }, [user.id]);

    const handleTimeClose = (time) => {
        setTimeAnchorEl(null);
        if (time) {
            setSelectedTime(time); // Update the selected time
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        async function fetchDishes() {
            if (user.id) {
                try {
                    const response = await axiosInstance.get(`api/user-ready-dishes/${user.id}`);
                    setDishes(response.data);
                } catch (error) {
                    console.error('Error fetching dishes:', error);
                }
            }
        }

        fetchDishes();
    }, [user.id]);

    async function toMenu() {
        navigate('/shoppingcart');
    }

    function calculateTotalPrice(dishes) {
        let sum = 0;
        dishes.forEach((dish) => {
            sum += dish.count * dish.dish.price * (1 - dish.dish.discount);
        });
        return sum;
    }

    function getNext7Days() {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = addDays(new Date(), i);
            days.push(format(date, 'ccc, d MMMM', {locale: uk}));
        }
        return days;
    }

    function getTimeIntervals() {
        const intervals = [];
        let time = setHours(setMinutes(new Date(), 0), 10);
        const endTime = setHours(setMinutes(new Date(), 0), 19);

        while (time <= endTime) {
            intervals.push(format(time, 'HH:mm'));
            time = addMinutes(time, 30);
        }

        return intervals;
    }

    const updatePrice = () => {
        setTotalPrice(calculateTotalPrice(dishes) + deliveryPrice);
    };


    async function onConfirmClick(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put(`api/update_confirm_order/${dishes[0].order.id}`, {
                address,
                selectedDate,
                selectedTime,
                numberPeople,
                note,
                totalPrice
            });

            // Handle successful response here if needed
            navigate(`/payment/${dishes[0].order.id}`);
        } catch (error) {
            console.error('Error submitting the form:', error);
            // Handle error here if needed
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={styles['main-content']}>
            <div className={styles['left-container']}>
                <h5>Кошик</h5>
                <div className={styles['shadow-container']}>
                    <div className={styles['cart-container']}>
                        <div className={styles['top-part-cart-container']}>
                            <h4 className={styles['h4-cart']}>FoodDelivery</h4>
                        </div>

                        {dishes.map((dish) => (
                            <div className={styles['product-card']} key={dish.id}>
                                <div className={styles['card-text']}>
                                    <h6>
                                        {dish.count} x {dish.dish.category.category_name}:{' '}
                                        {dish.dish.product_name}
                                    </h6>
                                    <h7>{dish.dish.price * (1 - dish.dish.discount)} ₴</h7>
                                </div>
                            </div>
                        ))}
                        <h5>Чек: {calculateTotalPrice(dishes)} ₴</h5>
                    </div>
                    <div className={styles['btn-container']}>
                        <button
                            disabled={loading}
                            type="button"
                            className={styles['to-menu']}
                            onClick={toMenu}
                        >
                            Назад до кошику
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <form onSubmit={onConfirmClick} className={styles['no-style']}>
                    <div className={styles['right-container']}>
                        <div>
                            <h5>Спосіб отримати</h5>
                            <div className={styles['order-add-info-container']}>
                                <div className={styles['header-btn']}>
                                    <span>Доставка до дому</span>
                                </div>

                                <div className={styles['delivery-input']}>
                                    <div className={styles['input-fields']}>
                                        <Tooltip title="Вулиця, будинок">
                                            <LocationOnIcon/>
                                        </Tooltip>
                                        <input
                                            type="text"
                                            placeholder="Вулиця, будинок"
                                            value={address}
                                            autoComplete="address-line1"
                                            className={styles['param-field']}
                                            id="address"
                                            onChange={onAddressChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles['bottom-info-container']}>
                                    <div className={styles['bottom-info-total']}>
                                        <h7>Вартість доставки:</h7>
                                        <h7>60 грн</h7>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5>Час отримання</h5>
                            <div className={styles['order-add-info-container']}>
                                <div className={styles['header-btn']}>
                                    <span>У вказаний час</span>
                                </div>
                                <div className={styles['data-time-input']}>
                                    <div className={styles['data-time-input-container']}>
                                        <CalendarMonthIcon/>
                                        <div>
                                            <span onClick={handleDateClick}>{selectedDate}</span>
                                        </div>
                                        <KeyboardArrowDownIcon onClick={handleDateClick}/>
                                        <Menu
                                            anchorEl={dateAnchorEl}
                                            open={Boolean(dateAnchorEl)}
                                            onClose={() => handleDateClose(null)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 200,
                                                    width: 200,
                                                    overflow: 'auto',
                                                },
                                            }}
                                        >
                                            {getNext7Days().map((date, index) => (
                                                <MenuItem key={index} onClick={() => handleDateClose(date)}>
                                                    {date}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>

                                    <div className={styles['data-time-input-container']}>
                                        <QueryBuilderIcon/>
                                        <div>
                                            <span onClick={handleTimeClick}>{selectedTime}</span>
                                        </div>
                                        <KeyboardArrowDownIcon onClick={handleTimeClick}/>
                                        <Menu
                                            anchorEl={timeAnchorEl}
                                            open={Boolean(timeAnchorEl)}
                                            onClose={() => handleTimeClose(null)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 200,
                                                    width: 150,
                                                    overflow: 'auto',
                                                },
                                            }}
                                        >
                                            {getTimeIntervals().map((time, index) => (
                                                <MenuItem key={index} onClick={() => handleTimeClose(time)}>
                                                    {time}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5>Дані</h5>
                            <div className={styles['order-add-info-container']}>
                                <div className={styles['delivery-input']}>
                                    <div className={styles['input-fields']}>
                                        <Tooltip title="Кількість осіб">
                                            <PeopleIcon/>
                                        </Tooltip>
                                        <input
                                            type="number"
                                            placeholder="Кількість осіб"
                                            autoComplete="off"
                                            value={numberPeople}
                                            className={styles['param-field']}
                                            id="number-person"
                                            onChange={onNumberPeopleChange}
                                            required
                                        />
                                    </div>

                                    <div className={styles['input-fields']}>
                                        <Tooltip title="Примітка до замовлення">
                                            <EditIcon/>
                                        </Tooltip>
                                        <input
                                            type="text"
                                            placeholder="Примітка до замовлення"
                                            autoComplete="off"
                                            value={note}
                                            className={styles['param-field']}
                                            id="note"
                                            onChange={onNoteChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5>Спосіб оплати</h5>
                            <div className={styles['order-add-info-container']}>
                                <Tooltip title="Доступна оплата онлайн">
                                    <div className={styles['header-btn']}>
                                        <span>Оплата онлайн</span>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div>
                            <h5>Оплата</h5>
                            <div className={styles['order-add-info-container']}>
                                <div className={styles['bottom-info-container']}>
                                    <div className={styles['bottom-info']}>
                                        <h7>Чек:</h7>
                                        <h7>{calculateTotalPrice(dishes)} грн</h7>
                                    </div>
                                    <div className={styles['bottom-info']}>
                                        <h7>Вартість доставки:</h7>
                                        <h7>{deliveryPrice} грн</h7>
                                    </div>
                                    <div className={styles['bottom-info-total']}>
                                        <h7>До сплати:</h7>
                                        <h7>{calculateTotalPrice(dishes) + deliveryPrice} грн</h7>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.confirm}>
                        <button
                            disabled={loading}
                            type="submit"
                            className={styles['to-confirm']}
                            onClick={() => {
                                updatePrice();
                            }}
                        >
                            Оформити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
