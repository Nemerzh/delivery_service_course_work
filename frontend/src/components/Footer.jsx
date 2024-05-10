import React from "react";
import {NavLink} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';


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
                    <a className="navbar-brand nav-link active" href="">
                        <img className="logo-footer" src="../../static/images/5.png" alt="logo"/>
                    </a>
                    <div className="footer-supported-content" id="navbarSupportedContent1">
                        <ul className="navbar-nav footer-supported-content">
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Акції</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Новини</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Про нас</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Умови доставки</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Способи оплати</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Контакти</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Підтримка</p></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link" href="https://www.facebook.com/?locale=uk_UA"
                                   target="blank"><p className="top-footer-label">Правила конфіденційності</p></a>
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
                                <a className="nav-link link-scale" href="https://www.facebook.com/?locale=uk_UA" target="blank"><FacebookIcon sx={{ fontSize: 30 }} /></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link link-scale" href="https://www.instagram.com/" target="blank"><InstagramIcon sx={{ fontSize: 30 }} /></a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a className="nav-link link-scale" href="https://www.youtube.com/" target="blank"><EmailIcon sx={{ fontSize: 30 }}/></a>
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
