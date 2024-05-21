import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import * as bannerStyles from "../../src/pages/main/main.module.css";
import * as styles from './info.module.css';

export default function ContactPage() {
    return (
        <div className="feedback-page">

            <div className={bannerStyles.banner}>
                <div className={bannerStyles["banner-head"]}>
                    <img className={bannerStyles["head-logo"]} src="../../../static/images/3.png" alt="Fooddelivery"/>
                </div>
                <div className={bannerStyles["banner-body"]}>
                    <NavLink to="/main" className={bannerStyles["button-banner"]}>
                        Меню
                    </NavLink>
                    <NavLink to="/feedback/list" className={`${bannerStyles["button-banner"]}`}>
                        Відгуки
                    </NavLink>
                    <a href="#" className={bannerStyles["button-banner"]}>Історія</a>
                    <NavLink to="/info" className={`${bannerStyles["button-banner"]}`}>
                        Інфо
                    </NavLink>
                </div>
            </div>

            <div className="feedback-container">
                <h1>Акції</h1>
                <p className={styles["main-text"]}>
                    <h2>Подарунок до кожного замовлення на день народження</h2>
                    Постійна акція <br/>
                    Святкуйте свій день народження разом з нами! Отримайте спеціальний подарунок до кожного замовлення
                    на честь вашого свята. Не забудьте повідомити нас про ваш день народження при замовленні. <br/>

                    <br/><h2>Сімейний обід зі знижкою 10%</h2>
                    Щонеділі <br/>
                    Приходьте до нас всією сім'єю щонеділі та отримуйте знижку 10% на сімейний обід. Чудова нагода
                    провести час з рідними та насолодитися смачною їжею. <br/>

                    <br/><h2>Спеціальна пропозиція</h2>
                    1 квітня 2024 року <br/>
                    Тільки до кінця місяця! Замовляйте будь-яку піцу та отримуйте другу піцу за пів ціни. Поспішайте
                    скористатися вигідною пропозицією! <br/>

                    <br/><h2>Безкоштовна доставка на перше замовлення</h2>
                    1 серпня - 31 серпня 2023 року<br/>
                    Зробіть перше замовлення через наш вебсайт та отримайте безкоштовну доставку. Скористайтесь цією
                    акцією та насолоджуйтесь улюбленими стравами вдома! <br/>
                </p>
            </div>
        </div>
    );
}