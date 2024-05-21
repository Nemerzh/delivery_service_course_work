import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import '../../static/css/footer.css';


export default function Footer(props) {
    const {visible} = props
    const {isLoggedIn} = useAuth();
    if (!visible) {
        return <></>
    }

    return (
        <footer className="footer">
            <nav
                className="navbar navbar-fixed-bottom navbar-expand-lg footer-top-size-color top-footer-component-position">
                <div className="footer-top-container">
                    <Link to="/" className="navbar-brand nav-link active">
                        <img className="logo-footer" src="../../static/images/5.png" alt="logo"/>
                    </Link>
                    <div className="footer-supported-content" id="navbarSupportedContent1">
                        <ul className="navbar-nav footer-supported-content">
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="http://localhost:8000/actions" className="nav-link"><p
                                    className="top-footer-label">Акції</p></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="http://localhost:8000/news" className="nav-link"><p
                                    className="top-footer-label">Новини</p></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="http://localhost:8000/aboutus" className="nav-link"><p
                                    className="top-footer-label">Про нас</p></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="http://localhost:8000/deliveryconditions" className="nav-link"><p
                                    className="top-footer-label">Умови доставки</p></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="http://localhost:8000/contacts" className="nav-link"><p
                                    className="top-footer-label">Контакти</p></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="https://www.facebook.com/?locale=uk_UA" className="nav-link"><p
                                    className="top-footer-label">Підтримка</p></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="http://localhost:8000/confidentialityrules" className="nav-link"><p
                                    className="top-footer-label">Правила конфіденційності</p></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-fixed-bottom navbar-expand-lg footer-bottom-size-color">
                <div className="footer-bottom-container">
                    <div className="bottom-icons" id="navbarSupportedContent1">
                        <ul className="navbar-nav d-flex flex-row me-1">
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="https://www.facebook.com/?locale=uk_UA" className="nav-link link-scale"><FacebookIcon sx={{ fontSize: 30 }} /></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="https://www.instagram.com/" className="nav-link link-scale"><InstagramIcon sx={{ fontSize: 30 }} /></Link>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <Link to="https://www.youtube.com/" className="nav-link link-scale"><EmailIcon sx={{ fontSize: 30 }}/></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-footer-text-container">
                        <p className="bottom-footer-label">+380-(98)-324-318-2</p>
                        <p className="bottom-footer-label">пн-нд 9:00-21:00</p>
                        <p className="bottom-footer-label"> © 2024 FoodDelivery</p>
                    </div>
                </div>
            </nav>
        </footer>
    );
}
