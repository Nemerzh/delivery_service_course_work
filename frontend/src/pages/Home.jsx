import React from 'react'
import {useState, useEffect} from "react";
import {Navigation, A11y} from 'swiper/modules';
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {useSwiper} from 'swiper/react';
import '../../static/css/index.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [size, setSize] = useState(4);
    const swiper = useSwiper();


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/category");
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, []); // Передача порожнього масиву як другого аргументу useEffect

    function calculateSlidesPerView() {
        if (window.innerWidth < 550) {
            return 1;
        } else if (window.innerWidth < 1024) {
            return 2;
        } else if (window.innerWidth < 1300) {
            return 3;
        } else return 4;
    }

    window.addEventListener('load', () => {
        let newSize = calculateSlidesPerView();
        setSize(newSize);
    });

    window.addEventListener('resize', () => {
        let newSize = calculateSlidesPerView();
        setSize(newSize);
    });


    return (
        <div className="start-page-main-container">
            <div className="img-start-page">
                <div className="img-start-page-content">
                    <img className="food-delivery-logo" src="../../static/images/Food.png" alt="Fooddelivery"/>
                    <h1 className="bg-img-title">
                        Замовляй улюблені страви
                    </h1>
                    <a className="link-to-main-page" href="/">
                        <div className="link-to-main-page-body">Меню</div>
                    </a>
                </div>
            </div>

            <div style={{maxWidth: "85%", marginTop: "25px"}}>
                <Swiper
                    className="swiper-container"
                    modules={[Navigation, A11y]}
                    spaceBetween={11}
                    slidesPerView={size}
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
                                <img src={category.url_image} alt=""/>
                                <h5>{category.category_name}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="title-start-page-text">
                <h3>Про нас</h3>
            </div>

            <div className="start-page-text-container">
                <b>Salateira - мережа ресторанів здорового харчування. Думаєте, це неможливо?
                    Просто замовте страви з меню Salateira. </b><br/><br/>У нас діє зручна доставка їжі у Києві.
                Скуштуйте і
                переконайтеся, наскільки смачною, поживною і здоровою може бути їжа з ресторану швидкого
                харчування. <br/>
                Міжнародна мережа Salateira — це заклади здорового харчування. Ми об'єднали бездоганну якість страв,
                швидке обслуговування і великий вибір інгредієнтів. Приправили це бездоганною якістю і прекрасним
                смаком. А ще у нас — великі порції. Тож можна не просто насолоджуватися смаком, але й ефективно тамувати
                голод.<br/>
                Замовити їжу онлайн з Salateira у Києві можна за помірними цінами. На нашому сайті завжди актуальні
                пропозиції меню та вигідні акції. Щодня замовникам доступні знижки та інші цікаві пропозиції на страви з
                доставкою.<br/>
                В меню салат-бару Salateira ви можете знайти і замовити з доставкою:
                <ul>
                    <li> сезонні страви від бренд-шефа (меню оновлюється кожні 3 місяці);</li>
                    <li> соковиті салати;</li>
                    <li> оригінальні пасти;</li>
                    <li> авторські равіолі;</li>
                    <li> свіженькі сендвічі та круасани;</li>
                    <li> солоденькі десерти;</li>
                    <li> а ще хумус, соуси, напої та каву.</li>
                </ul>
                У нас є все, щоб перекусити, скуштувати смачненьке чи досхочу наїстись. Кожному — своє, і ми надаємо
                повну свободу вибору.<br/>
                Доставка з Salateira у Києві швидка і зручна. Оформити замовлення ви можете на цьому сайті, у мобільному
                додатку або подзвонивши оператору. Принцип замовлення дуже простий. Ми передаємо кур’єрам щойно
                приготовані страви: максимально свіжі, смачні та добре запаковані. <br/>
                Харчуйтеся смачно і з користю для здоров'я разом з Salateira. Замовте доставку їжі у Києві та оцініть
                всі переваги: різноманітне особливе меню, чудовий сервіс, оптимальні ціни і власний гарний настрій після
                знайомства з нами. Чекаємо на ваші замовлення!
            </div>
        </div>
    )
}
