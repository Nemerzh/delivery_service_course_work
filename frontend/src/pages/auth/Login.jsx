import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import useAuth from '../../hooks/useAuth';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HttpsIcon from '@mui/icons-material/Https';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../static/css/login.css';

export default function Login() {
    const { setAccessToken, setCSRFToken, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromLocation = location?.state?.from?.pathname || '/';
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    async function checkIfCourier(userId) {
        try {
            const responseUser = await axiosInstance.get(`/api/find-user-role/${email}`);
            if (responseUser.data.role_id === 5) {
                window.location.href = '/availableorders';
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error fetching couriers:', error);
            navigate('/');
        }
    }

    async function onSubmitForm(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const response = await axiosInstance.post('api/login', JSON.stringify({
                email,
                password
            }));

            setAccessToken(response?.data?.access_token);
            setCSRFToken(response.headers["x-csrftoken"]);
            setIsLoggedIn(true);
            setEmail('');
            setPassword('');
            setLoading(false);

            await checkIfCourier(response?.data?.user?.id);

        } catch (error) {
            setLoading(false);
            toast.error('Проблема з входом. Перевірте ваші дані');
        }
    }

    async function OnForgotClick() {
        try {
            const response = await axiosInstance.post('api/forgot_password', JSON.stringify({
                email
            }));
            toast.success('Ваш новий пароль надіслано на пошту');
        } catch (error) {
            setLoading(false);
            toast.error('Вкажіть вашу пошту');
        }
    }

    return (
        <div className='login-page-container'>
            <Link to="/">
                <img src="/../static/images/5.png" className="logotype" alt="logotype" />
            </Link>
            <div className="login-container">
                <h3 className="login-form-label">Login</h3>
                <form onSubmit={onSubmitForm} autoComplete="off" required>
                    <div className="login-param">
                        <div className="login-param-container">
                            <div className="icons">
                                <MailOutlineIcon style={{ width: '30px', height: '30px' }} />
                            </div>
                            <input
                                type="email"
                                placeholder='Email'
                                autoComplete='off'
                                className='param-field'
                                id="email"
                                value={email}
                                onChange={onEmailChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="login-param">
                        <div className="login-param-container">
                            <div className="icons">
                                <HttpsIcon style={{ width: '30px', height: '30px' }} />
                            </div>
                            <input
                                type="password"
                                placeholder='Password'
                                autoComplete='off'
                                className='param-field'
                                id="password"
                                value={password}
                                onChange={onPasswordChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <h5 className="forgot" onClick={OnForgotClick}>Забули пароль?</h5>
                    </div>

                    <div className="login-param">
                        <button disabled={loading} className='login-btn' type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
