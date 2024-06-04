import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import * as bannerStyles from "../main/main.module.css";
import * as styles from './info.module.css';

export default function ContactPage() {
    return (
        <div className="feedback-page">

            <div className={bannerStyles.banner}>
                <div className={bannerStyles["banner-head"]}>
                    <img className={bannerStyles["head-logo"]} src="../../../static/images/3.png" alt="Fooddelivery"/>
                </div>
                <div className={bannerStyles["banner-body"]}>
                    <a href={"/main"} className={`${bannerStyles["button-banner"]}`}>Меню</a>
                    <div className={bannerStyles["banner-body"]}>
                        <a href={"/main"} className={`${bannerStyles["button-banner"]}`}>Меню</a>
                        <a href={"/feedback/list"} className={`${bannerStyles["button-banner"]}`}>Відгуки</a>
                        <a href="#" className={`${bannerStyles["button-banner"]} ${bannerStyles["active"]}`}>Інфо</a>
                    </div>
                </div>
            </div>

            <div className="feedback-container">
                <h1>Інформація</h1>
                <p className={styles["main-text"]}>
                    <br/>
                    <NavLink to="/aboutus" className={styles["nav-link"]}>
                        Про нас
                    </NavLink>
                    <NavLink to="/contacts" className={styles["nav-link"]}>
                        Контакти
                    </NavLink>
                    <NavLink to="/actions" className={styles["nav-link"]}>
                        Акції
                    </NavLink>
                    <NavLink to="/confidentialityrules" className={styles["nav-link"]}>
                        Правила конфеденційності
                    </NavLink>
                    <NavLink to="/deliveryconditions" className={styles["nav-link"]}>
                        Умови доставки
                    </NavLink>
                    <NavLink to="/news" className={styles["nav-link"]}>
                        Новини
                    </NavLink>
                </p>
            </div>
        </div>
    );
}