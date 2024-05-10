import React from "react";
import {NavLink} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MenuIcon from '@mui/icons-material/Menu';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar(props) {
    const {visible} = props
    const {isLoggedIn} = useAuth();
    if (!visible) {
        return <></>
    }

    return (
        <>
            <input type="checkbox" id="menu-toggle" hidden=""></input>

                <menu className="menu">
                    <label htmlFor="menu-toggle" className="menu-toggle" onClick=""></label>
                    <h2 className="menu-logo">
                        <a href="/">
                            <img className="logo" src="../../static/images/5.png" alt="logo"/>
                        </a>
                    </h2>
                    <ul>
                    <li>
                            <a href="">Профіль</a>
                        </li>
                        <li>
                            <a href="">Меню</a>
                        </li>
                        <li>
                            <a href="">Відгуки</a>
                        </li>
                        <li>
                            <a href="">Історія замовлень</a>
                        </li>
                        <li>
                            <a href="">Підтримка</a>
                        </li>
                        <li>
                            <a href="">Новини</a>
                        </li>
                    </ul>
                </menu>

            <div className="mask-content"></div>
            <nav className="navbar navbar-expand-sm sticky-top nav-bar-size-color">
                    <div className="container-fluid">
                        <div className="menu-logo-container">
                            <a className="navbar-brand" href="">
                                <img className="logo" src="../../static/images/5.png" alt="logo"/>
                            </a>
                        </div>
                        <div className="" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active link-scale" aria-current="page"
                                       href=""><SupportAgentOutlinedIcon fontSize="large"/> </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active link-scale" aria-current="page"
                                       href=""><ShoppingCartIcon fontSize="large"/></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active link-scale" href="/admin/"><AccountCircleIcon
                                        fontSize="large"/></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
            );
    }
