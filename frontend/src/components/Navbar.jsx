import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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
        navigate('/')
    }

    return (
        <>
            <input type="checkbox" id="menu-toggle" hidden="" checked={menuOpen} onChange={toggleMenu}></input>

            <menu className="menu">
                <label htmlFor="menu-toggle" className="menu-toggle" onClick=""></label>
                <h2 className="menu-logo">
                    <Link to="/" onClick={closeMenu}>
                        <img className="logo" src="../../static/images/5.png" alt="logo"/>
                    </Link>
                </h2>
                <ul>
                    {isLoggedIn && (
                        <li>
                            <Link to="auth/user" onClick={closeMenu}>Профіль</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/main" onClick={closeMenu}>Меню</Link>
                    </li>
                    <li>
                        <Link to="/feedback/list" onClick={closeMenu}>Відгуки</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link to="order_history" onClick={closeMenu}>Історія замовлень</Link>
                        </li>
                    )}

                    <li>
                        <Link to="https://t.me/fooodDelivery_bot" onClick={closeMenu}>Підтримка</Link>
                    </li>
                    <li>
                        <Link to="/news" onClick={closeMenu}>Новини</Link>
                    </li>
                </ul>
            </menu>

            <div className="mask-content" onClick={closeMenu}></div>
            <nav className="navbar navbar-expand-sm sticky-top nav-bar-size-color">
                <div className="container-fluid">
                    <div className="menu-logo-container">
                        <Link to="/" className="navbar-brand">
                            <img className="logo" src="../../static/images/5.png" alt="logo"/>
                        </Link>
                    </div>
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="" className="nav-link active link-scale">
                                    <SupportAgentOutlinedIcon fontSize="large"/>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="shoppingcart" className="nav-link active link-scale">
                                    <ShoppingCartIcon fontSize="large"/>
                                </Link>
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
                                            <Link className="profile-drop-link" to="/auth/user">Мій аккаунт</Link>
                                        </MenuItem>
                                        <MenuItem disabled={isLoggedIn} onClick={handleClose}>
                                            <Link className="profile-drop-link" to="/auth/login">Увійти</Link>
                                        </MenuItem>
                                        {!isLoggedIn && (
                                            <MenuItem onClick={handleClose}>
                                                <Link className="profile-drop-link"
                                                      to="/auth/register">Реєстрація</Link>
                                            </MenuItem>
                                        )}
                                        <MenuItem disabled={!isLoggedIn} onClick={() => {
                                            onLogout();
                                            handleClose();
                                        }}>
                                            <Link className="profile-drop-link" to="/auth/user">Вийти</Link>
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
