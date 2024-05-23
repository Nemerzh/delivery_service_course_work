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
                <h1>Умови доставки</h1>
                <p className={styles["main-text"]}>
                    <br/> Ми прагнемо забезпечити вам найкращий сервіс та зручні умови доставки. Нижче наведені основні
                    правила та умови нашої доставки: <br/>

                    <h2>Регіони доставки</h2>
                    Ми здійснюємо доставку по всій території України. Якщо ваше замовлення знаходиться за межами наших
                    стандартних зон доставки, будь ласка, зв'яжіться з нами для уточнення можливості доставки.
                    <strong>Години роботи:</strong> <br/>
                    <strong>·</strong> Понеділок - П'ятниця: 9:00 - 18:00 <br/>
                    <strong>·</strong> Субота: 10:00 - 14:00 <br/>
                    <strong>·</strong> Неділя: вихідний <br/>

                    <h2>Вартість доставки</h2>
                    Вартість доставки залежить від суми вашого замовлення та регіону доставки. Детальну інформацію про
                    вартість доставки можна дізнатися під час оформлення замовлення.

                    <h2>Мінімальна сума замовлення</h2>
                    Мінімальна сума замовлення для безкоштовної доставки становить 30 гривень. Для замовлень на меншу
                    суму вартість доставки буде розрахована індивідуально.

                    <h2>Повернення та обмін</h2>
                    Якщо товар не відповідає вашим очікуванням, ви можете повернути або обміняти його протягом 14 днів з
                    моменту отримання замовлення. Товар повинен бути у первісному стані, з усіма етикетками та
                    упаковкою. Витрати на зворотню доставку несе покупець, за винятком випадків, коли товар був
                    доставлений з дефектами або не відповідає замовленню.
                </p>
            </div>
        </div>
    );
}