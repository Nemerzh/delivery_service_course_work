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
                <h1>Про нас</h1>
                <p className={styles["main-text"]}>
                    <br/> <strong>Salateira - мережа ресторанів здорового харчування. Думаєте, це неможливо? Просто
                    замовте
                    страви з меню Salateira.</strong><br/>

                    У нас діє зручна доставка їжі у Києві. Скуштуйте і переконайтеся, наскільки смачною, поживною і
                    здоровою може бути їжа з ресторану швидкого харчування.
                    Міжнародна мережа Salateira — це заклади здорового харчування. Ми об'єднали бездоганну якість страв,
                    швидке обслуговування і великий вибір інгредієнтів. Приправили це бездоганною якістю і прекрасним
                    смаком. А ще у нас — великі порції. Тож можна не просто насолоджуватися смаком, але й ефективно
                    тамувати голод.
                    Замовити їжу онлайн з Salateira у Києві можна за помірними цінами. На нашому сайті завжди актуальні
                    пропозиції меню та вигідні акції. Щодня замовникам доступні знижки та інші цікаві пропозиції на
                    страви з доставкою. <br/> <br/>
                    В меню салат-бару Salateira ви можете знайти і замовити з доставкою: <br/>

                    <strong>·</strong> сезонні страви від бренд-шефа (меню оновлюється кожні 3 місяці); <br/>
                    <strong>·</strong> соковиті салати; <br/>
                    <strong>·</strong> оригінальні пасти; <br/>
                    <strong>·</strong> авторські равіолі; <br/>
                    <strong>·</strong> свіженькі сендвічі та круасани; <br/>
                    <strong>·</strong> солоденькі десерти; <br/>
                    <strong>·</strong> а ще хумус, соуси, напої та каву. <br/> <br/>

                    У нас є все, щоб перекусити, скуштувати смачненьке чи досхочу наїстись. Кожному — своє, і ми надаємо
                    повну свободу вибору.
                    Доставка з Salateira у Києві швидка і зручна. Оформити замовлення ви можете на цьому сайті, у
                    мобільному додатку або подзвонивши оператору. Принцип замовлення дуже простий. Ми передаємо кур’єрам
                    щойно приготовані страви: максимально свіжі, смачні та добре запаковані.
                    Харчуйтеся смачно і з користю для здоров'я разом з Salateira. Замовте доставку їжі у Києві та
                    оцініть всі переваги: різноманітне особливе меню, чудовий сервіс, оптимальні ціни і власний гарний
                    настрій після знайомства з нами. Чекаємо на ваші замовлення!
                </p>
            </div>
        </div>
    );
}