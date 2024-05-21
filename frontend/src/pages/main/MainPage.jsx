import * as styles from './main.module.css'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import axios from 'axios';

export default function MainPage() {
    const [categories, setCategories] = useState([]);
    const size = categories.length;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/category");
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.banner}>
                <div className={styles["banner-head"]}>
                    <img className={styles["head-logo"]} src="../../../static/images/3.png" alt="Fooddelivery" />
                </div>
                <div className={styles["banner-body"]}>
                    <a href="#" className={`${styles["button-banner"]} ${styles["active"]}`}>Меню</a>
                    <a href="#" className={styles["button-banner"]}>Відгуки</a>
                    <a href="#" className={styles["button-banner"]}>Історія</a>
                    <a href="#" className={styles["button-banner"]}>Інфо</a>
                </div>
            </div>

            <div style={{ maxWidth: "85%", marginTop: "25px" }}>
                <Swiper
                    className="swiper-container"
                    modules={[Navigation, A11y]}
                    spaceBetween={11}
                    slidesPerView={5}
                    navigation
                >
                    {categories.map(category => (
                        <SwiperSlide
                            onClick={(swiper) => {
                                console.log()
                            }}
                            key={category.id}
                        >
                            <div className="category-swiper-start-page">
                                <h5>{category.category_name}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles["container-goods"]}>
                <section className={styles.cell}>
                    <div className={styles.goods}>
                        <div className={styles["goods-header"]}>
                            <img className={styles["goods-img"]} src="../../../static/images/product.png"
                                 alt="Product"/>
                        </div>
                        <div className={styles["goods-body"]}>
                            <div className={styles["goods-name"]}>
                                Super chicken
                            </div>
                            <div className={styles["goods-price"]}>
                                999$
                            </div>
                        </div>
                    </div>

                    <div className={styles.goods}>
                        <div className={styles["goods-header"]}>
                            <img className={styles["goods-img"]} src="../../../static/images/product.png"
                                 alt="Product"/>
                        </div>
                        <div className={styles["goods-body"]}>
                            <div className={styles["goods-name"]}>
                                Super chicken
                            </div>
                            <div className={styles["goods-price"]}>
                                999$
                            </div>
                        </div>
                    </div>

                    <div className={styles.goods}>
                        <div className={styles["goods-header"]}>
                            <img className={styles["goods-img"]} src="../../../static/images/product.png"
                                 alt="Product"/>
                        </div>
                        <div className={styles["goods-body"]}>
                            <div className={styles["goods-name"]}>
                                Super chicken
                            </div>
                            <div className={styles["goods-price"]}>
                                999$
                            </div>
                        </div>
                    </div>

                    <div className={styles.goods}>
                        <div className={styles["goods-header"]}>
                            <img className={styles["goods-img"]} src="../../../static/images/product.png"
                                 alt="Product"/>
                        </div>
                        <div className={styles["goods-body"]}>
                            <div className={styles["goods-name"]}>
                                Super chicken
                            </div>
                            <div className={styles["goods-price"]}>
                                999$
                            </div>
                        </div>
                    </div>

                    <div className={styles.goods}>
                        <div className={styles["goods-header"]}>
                            <img className={styles["goods-img"]} src="../../../static/images/product.png"
                                 alt="Product"/>
                        </div>
                        <div className={styles["goods-body"]}>
                            <div className={styles["goods-name"]}>
                                Super chicken
                            </div>
                            <div className={styles["goods-price"]}>
                                999$
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
