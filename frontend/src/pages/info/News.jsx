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
                <h1>Новини</h1>
                <p className={styles["main-text"]}>
                    <h2>Оновлення меню</h2>
                    20 травня 2024 року <br/>
                    Ми раді повідомити про оновлення нашого меню! Додано нові страви, які обов'язково сподобаються нашим
                    клієнтам. Серед новинок – смачні салати, гарячі страви та десерти. Завітайте до нашого ресторану та
                    спробуйте їх першими! <br/>

                    <br/><h2>Відкриття нових філій</h2>
                    15 квітня 2024 року <br/>
                    Ми відкриваємо дві нові філії в Києві та Львові! Нові локації вже готові приймати відвідувачів.
                    Чекаємо на вас за новими адресами та пропонуємо знижку 10% на перше замовлення. <br/>

                    <br/><h2>Спеціальна пропозиція</h2>
                    1 квітня 2024 року <br/>
                    Тільки до кінця місяця! Замовляйте будь-яку піцу та отримуйте другу піцу за пів ціни. Поспішайте
                    скористатися вигідною пропозицією! <br/>

                    <br/><h2>Онлайн-замовлення</h2>
                    20 березня 2024 року <br/>
                    Ми запустили нову функцію онлайн-замовлення через наш вебсайт. Тепер ви можете зручно замовити ваші
                    улюблені страви з доставкою додому. Спробуйте прямо зараз! <br/>
                </p>
            </div>
        </div>
    );
}