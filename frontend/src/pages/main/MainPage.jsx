import * as styles from './main.module.css';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";
import axios from 'axios';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import {NavLink} from "react-router-dom";
import {axiosInstance} from "../../api/apiConfig";
import {Modal} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import SearchIcon from '@mui/icons-material/Search';

export default function MainPage() {
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null);
    const [nextCategory, setNextCategory] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {user} = useAuth()
    const getUser = useUser()
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(prevShowSearch => !prevShowSearch);
    };


    useEffect(() => {
        getUser()
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setFilteredDishes(dishes.filter(dish =>
            dish.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    useEffect(() => {
        setFilteredDishes(dishes);
    }, [dishes]);


    const handleNextCategory = () => {
        if (nextCategory) {
            setSelectCategory(nextCategory);
        }
    };
    useEffect(() => {
        if (categories.length > 0 && selectCategory) {
            const currentIndex = categories.findIndex(category => category.id === selectCategory.id);
            const nextIndex = (currentIndex + 1) % categories.length;
            setNextCategory(categories[nextIndex]);
        }
    }, [selectCategory, categories]);


    const handleIncrement = () => {
        setCount(prevCount => Math.min(prevCount + 1, 999));
    };

    const handleDecrement = () => {
        setCount(prevCount => Math.max(prevCount - 1, 1));
    };

    const handleChange = (event) => {
        const value = Math.max(1, Math.min(999, Number(event.target.value)));
        setCount(value);
    };

    const handleAddToOrder = async () => {
        try {
            const response = await axiosInstance.get('/api/order', {
                params: {
                    user: user.id,
                    order_status: 'ready'
                }
            });
            let order;

            if (response.data.length === 0) {
                const cust = await axiosInstance.get(`/api/customer/${user.id}`);
                const orderData = {
                    user: cust.data.id,
                    start_time: new Date().toISOString(),
                    end_time: new Date().toISOString(),
                    order_status: 'ready',
                    price: 0,
                    comment: '-',
                };
                const newOrderResponse = await axiosInstance.post('/api/order', orderData);
                order = newOrderResponse.data;

            } else {
                order = response.data[0];
            }
            let existingDishToOrder = null;

            try {
                const responseDish = await axiosInstance.get(`/api/dish_to_order`, {
                    params: {
                        order_id: order.id,
                        dish_id: selectedProduct.id
                    }
                });
                existingDishToOrder = responseDish.data;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    existingDishToOrder = null;
                } else {
                    console.error('Error fetching dish to order:', error);
                    return;
                }
            }

            if (!existingDishToOrder) {
                await axiosInstance.post('/api/dish_to_order', {
                    order: order.id,
                    dish: selectedProduct.id,
                    count: count,
                });
            } else {
                await axiosInstance.put(`/api/dish_to_order_id/${existingDishToOrder.id}`, {
                    count: existingDishToOrder.count + count,
                });
            }
            toggleModal();
        } catch (error) {
            console.error('Error adding to order:', error);
        }
    };


    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/category");
                setCategories(response.data);

                if (!selectCategory && response.data.length > 0) {
                    setSelectCategory(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, []);

    useEffect(() => {
        const fetchDishes = async () => {
            if (selectCategory) {
                try {
                    const response = await axiosInstance.get(`api/categorydish/${selectCategory.id}`);
                    setDishes(response.data);
                } catch (error) {
                    console.error('Error fetching dishes:', error);
                }
            }
        };

        fetchDishes();
    }, [selectCategory]);

    return (
        <div className={styles.body}>
            <div className={styles.banner}>
                <div className={styles["banner-head"]}>
                    <img className={styles["head-logo"]} src="../../../static/images/3.png" alt="Fooddelivery"/>
                </div>
                <div className={styles["banner-body"]}>
                    <a className={`${styles["button-banner"]} ${styles["active"]}`}>Меню</a>
                    <NavLink to="/feedback/list" className={`${styles["button-banner"]}`}>
                        Відгуки
                    </NavLink>
                    <a href="#" className={styles["button-banner"]}>Історія</a>
                    <NavLink to="/info" className={`${styles["button-banner"]}`}>
                        Інфо
                    </NavLink>
                    <button onClick={toggleSearch} className={styles["button-banner"]}>Пошук</button>
                </div>
            </div>

            <div style={{maxWidth: "95%", marginTop: "25px", marginLeft: "auto", marginRight: "auto"}}>
                <Swiper
                    className="swiper-container"
                    modules={[Navigation, A11y]}
                    spaceBetween={1}
                    slidesPerView={10}
                    centeredSlides={false}
                    navigation
                >
                    {categories.map(category => (
                        <SwiperSlide
                            onClick={() => {
                                setSelectCategory(category);
                            }}
                            key={category.id}
                        >
                            <div className="category-swiper-main-page">
                                <h5 className={styles["swiper-button"]}>{category.category_name}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {showSearch && (
                <div className={styles["search-container"]}>
                    <input
                        type="search"
                        className={styles["search-place"]}
                        placeholder="Введіть назву продукта"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className={styles["search-button"]} onClick={handleSearchSubmit}>
                        <SearchIcon />
                    </button>
                </div>
            )}


            <div className={styles["container-goods"]}>
                <section className={styles.cell}>
                    {filteredDishes.map(dish => (
                        <div key={dish.id} className={styles.goods} onClick={() => {
                            toggleModal();
                            setSelectedProduct(dish);
                        }}>
                            <div className={styles["goods-header"]}>
                                <img className={styles["goods-img"]} src={dish.image_url}
                                     alt={dish.name}/>
                            </div>
                            <div className={styles["goods-body"]}>
                                <div className={styles["goods-name"]}>
                                    {dish.product_name}
                                </div>
                                <div className={styles["goods-price"]}>
                                    {dish.price}₴
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <div className={styles["next-button"]}>
                <button className={styles["more-button"]} onClick={handleNextCategory}>
                    {nextCategory ? `${nextCategory.category_name}  ->` : 'помилка'}
                </button>
            </div>
            <Modal open={showModal} onClose={toggleModal}>
                <div className={styles.popup}>
                    <div className={styles["popup-header"]}>
                        <img className={styles["counter-image"]} src="../../../static/images/product.png"
                             alt="Fooddelivery"/>
                    </div>
                    <div className={styles["popup-body"]}>
                        <div className={styles["product-name"]}>
                            {selectedProduct && selectedProduct.product_name}
                        </div>
                        <p className={styles["product-describe"]}>
                            {selectedProduct && selectedProduct.description}
                        </p>
                        <p className={styles["product-describe"]}>
                            Калорії: {selectedProduct && selectedProduct.calories}
                        </p>
                        <p className={styles["product-describe"]}>
                            Б({selectedProduct && selectedProduct.protein}) Ж({selectedProduct && selectedProduct.fat})
                            В({selectedProduct && selectedProduct.carbohydrate})
                        </p>
                        <p className={styles["product-describe"]}>
                            {selectedProduct && selectedProduct.mass} г
                        </p>
                    </div>
                    <div className={styles["product-bottom"]}>
                        <div className={styles["product-price"]}>
                            {selectedProduct && selectedProduct.price}₴
                        </div>
                        <div className={styles["product-counter"]}>
                            <button className={styles["counter-minus"]} type={"button"} onClick={handleDecrement}>-
                            </button>
                            <div className={styles["counter-container"]}>
                                <input
                                    type="number"
                                    className={styles["counter-number"]}
                                    min="1"
                                    max="999"
                                    value={count}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className={styles["counter-plus"]} type={"button"} onClick={handleIncrement}>+
                            </button>
                        </div>
                        <div className={styles["product-button-place"]}>
                            <button className={styles["counter-add"]} type={"button"}
                                    onClick={handleAddToOrder}>Додати
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
