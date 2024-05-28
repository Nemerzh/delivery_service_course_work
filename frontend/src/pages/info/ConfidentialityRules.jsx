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
                    <NavLink to="/info" className={`${bannerStyles["button-banner"]}`}>
                        Інфо
                    </NavLink>
                </div>
            </div>

            <div className="feedback-container">
                <h1>Правила конфеденційності</h1>
                <p className={styles["main-text"]}>
                    <h2>Вступ</h2>
                    Ми поважаємо вашу конфіденційність та прагнемо захищати ваші персональні дані. Ця Політика
                    конфіденційності пояснює, які дані ми збираємо, як ми їх використовуємо та захищаємо, а також ваші
                    права щодо ваших персональних даних. <br/>

                    <br/><h2>Збір персональних даних</h2>
                    Ми можемо збирати та обробляти такі персональні дані про вас:<br/>
                    <strong>·</strong> Ім'я та прізвище<br/>
                    <strong>·</strong> Контактні дані (номер телефону, адреса електронної пошти)<br/>
                    <strong>·</strong> Адреса доставки<br/>
                    <strong>·</strong> Платіжна інформація<br/>
                    <strong>·</strong> Інформація про замовлення та уподобання<br/>

                    <br/><h2>Використання персональних даних</h2>
                    Ми можемо збирати та обробляти такі персональні дані про вас:<br/>
                    <strong>·</strong> Обробки та доставки ваших замовлень<br/>
                    <strong>·</strong> Надання підтримки клієнтів<br/>
                    <strong>·</strong> Покращення нашого сервісу та продуктів<br/>
                    <strong>·</strong> Надсилання маркетингових повідомлень (за вашою згодою)<br/>
                    <strong>·</strong> Виконання юридичних зобов'язань<br/>

                    <br/><h2>Захист персональних даних</h2>
                    Ми застосовуємо відповідні технічні та організаційні заходи для захисту ваших персональних даних від
                    несанкціонованого доступу, втрати або знищення. Доступ до ваших даних мають лише ті співробітники,
                    яким це необхідно для виконання своїх обов'язків. <br/>

                    <br/><h2>Передача даних третім сторонам</h2>
                    Ми не продаємо та не передаємо ваші персональні дані третім сторонам, за винятком випадків, коли це
                    необхідно для обробки ваших замовлень (наприклад, кур'єрські служби) або виконання юридичних
                    зобов'язань. <br/>

                    <br/><h2>Зберігання даних</h2>
                    Ми зберігаємо ваші персональні дані тільки протягом часу, необхідного для виконання цілей,
                    зазначених у цій Політиці конфіденційності, або протягом періоду, встановленого
                    законодавством. <br/>
                </p>
            </div>
        </div>
    );
}