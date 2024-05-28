import React, {useState} from "react";
import {a, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout"
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../static/css/header.css';
import '../../static/css/menu.css';

export default function Navbar(props) {
    const navigate = useNavigate()
    const {visible} = props
    const {isLoggedIn} = useAuth();
    const logout = useLogout()
    if (!visible) {
        return <></>
    }

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function onLogout() {
        await logout()
        toast.success("Ви вийшли з вашого аккаунту!");
        // window.location.href = '/';
    }

    return (
        <>
            <input type="checkbox" id="menu-toggle" hidden="" checked={menuOpen} onChange={toggleMenu}></input>

            <menu className="menu">
                <label htmlFor="menu-toggle" className="menu-toggle" onClick=""></label>
                <h2 className="menu-logo">
                    <a href="/" onClick={closeMenu}>
                        <img className="logo" src="../../static/images/5.png" alt="logo"/>
                    </a>
                </h2>
                <ul>
                    {isLoggedIn && (
                        <li>
                            <a href="auth/user" onClick={closeMenu}>Профіль</a>
                        </li>
                    )}
                    <li>
                        <a href="/main" onClick={closeMenu}>Меню</a>
                    </li>
                    <li>
                        <a href="/feedback/list" onClick={closeMenu}>Відгуки</a>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <a href="/order_history" onClick={closeMenu}>Історія замовлень</a>
                        </li>
                    )}

                    <li>
                        <a href="https://t.me/fooodDelivery_bot" onClick={closeMenu}>Підтримка</a>
                    </li>
                    <li>
                        <a href="/news" onClick={closeMenu}>Новини</a>
                    </li>
                </ul>
            </menu>

            <div className="mask-content" onClick={closeMenu}></div>
            <nav className="navbar navbar-expand-sm sticky-top nav-bar-size-color">
                <div className="container-fluid">
                    <div className="menu-logo-container">
                        <a href="/" className="navbar-brand">
                            <img className="logo" src="../../static/images/5.png" alt="logo"/>
                        </a>
                    </div>
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a href="https://t.me/fooodDelivery_bot" className="nav-link active link-scale">
                                    <SupportAgentOutlinedIcon fontSize="large"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/shoppingcart" className="nav-link active link-scale">
                                    <ShoppingCartIcon fontSize="large"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link active link-scale">
                                    {!isLoggedIn ? (
                                        <NoAccountsIcon fontSize="large" onClick={handleClick}/>
                                    ) : (
                                        <AccountCircleIcon fontSize="large" onClick={handleClick}/>
                                    )}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem disabled={!isLoggedIn} onClick={handleClose}>
                                            <a className="profile-drop-link" href="/auth/user">Мій аккаунт</a>
                                        </MenuItem>
                                        <MenuItem disabled={isLoggedIn} onClick={handleClose}>
                                            <a href="/auth/login" className="profile-drop-link">Увійти</a>
                                        </MenuItem>
                                        {!isLoggedIn && (
                                            <MenuItem onClick={handleClose}>
                                                <a className="profile-drop-link"
                                                      href="/auth/register">Реєстрація</a>
                                            </MenuItem>
                                        )}
                                        <MenuItem disabled={!isLoggedIn} onClick={() => {
                                            onLogout();
                                            handleClose();
                                        }}>
                                            <a className="profile-drop-link">Вийти</a>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
