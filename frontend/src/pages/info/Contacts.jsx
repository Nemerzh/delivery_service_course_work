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
                    <a href={"/feedback/list"} className={`${bannerStyles["button-banner"]}`}>Відгуки</a>
                    <a href={"/info"} className={`${bannerStyles["button-banner"]}`}>Інфо</a>
                </div>
            </div>

            <div className="feedback-container">
                <h1>Контакти</h1>
                <p className={styles["main-text"]}>
                    <br/> Якщо у вас є запитання або пропозиції, зв'яжіться з нами за наступними контактами: <br/>

                    <strong>Email:</strong> info@example.com<br/>

                    <strong>Телефон:</strong> +38 012 345 67 89<br/>

                    <strong>Адреса:</strong> Адреса: вулиця Прикладна, 123, Місто, Країна<br/>

                    <strong>Години роботи:</strong> <br/>
                    <strong>·</strong> Понеділок - П'ятниця: 9:00 - 18:00 <br/>
                    <strong>·</strong> Субота: 10:00 - 14:00 <br/>
                    <strong>·</strong> Неділя: вихідний <br/>
                    Ми завжди раді вам допомогти та відповісти на всі ваші запитання! <br/>
                </p>
            </div>
        </div>
    );
}