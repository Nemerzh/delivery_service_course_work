import React from 'react';
import {useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {axiosInstance} from '../../api/apiConfig'
import useAuth from "../../hooks/useAuth"
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';
import '../../../static/css/register.css';
import {toast} from "react-toastify";


export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const phone_number = useRef()
    const password = useRef()
    const password2 = useRef(undefined)


    async function onSubmitForm(event) {
        event.preventDefault()
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            phone_number: phone_number.current.value,
            password: password.current.value,
            password2: password2.current.value
        };

        setLoading(true)

        try {
            const response = await axiosInstance.post('api/register', JSON.stringify(data))

            setLoading(false)

            window.location.href = '/auth/login';
        } catch (error) {
            if (error.response.data.email) {
                toast.error(error.response.data.email[0])
            }
            if (error.response.data.phone_number) {
                console.log("1")
                toast.error(error.response.data.phone_number[0])
            }
            if (error.response.data.password) {
                toast.error(error.response.data.password)
            }
            setLoading(false)

        }
    }

    return (
        <div className='register-page-container'>
            <a href="/">
                <img src="/../static/images/5.png" className="logotype" alt="logotype"/>
            </a>
            <div className="sign-up-container">
                <h3 className="sign-up-form-label">Create your account</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="sign-up-param">
                        <div className="sign-up-param-container">
                            <div className="icons">
                                <PersonIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input
                                type="text"
                                placeholder="First Name"
                                autoComplete="off"
                                className="param-field"
                                id="first_name"
                                ref={first_name}
                                required
                            />
                        </div>
                    </div>
                    <div className="sign-up-param">
                        <div className="sign-up-param-container">
                            <div className="icons">
                                <PersonIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                autoComplete="off"
                                className="param-field"
                                id="last_name"
                                ref={last_name}
                                required
                            />
                        </div>
                    </div>
                    <div className="sign-up-param">
                        <div className="sign-up-param-container">
                            <div className="icons">
                                <MailOutlineIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                className="param-field"
                                id="email"
                                ref={email}
                                required
                            />
                        </div>
                    </div>
                    <div className="sign-up-param">
                        <div className="sign-up-param-container">
                            <div className="icons">
                                <PhoneIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input
                                type="text"
                                placeholder="Phone number"
                                autoComplete="off"
                                className="param-field"
                                id="phone_number"
                                ref={phone_number}
                                required
                            />
                        </div>
                    </div>
                    <div className="sign-up-param">
                        <div className="sign-up-param-container">
                            <div className="icons">
                                <HttpsIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="off"
                                className="param-field"
                                id="password"
                                ref={password}
                                required
                            />
                        </div>
                    </div>
                    <div className="sign-up-param">
                        <div className="sign-up-param-container">
                            <div className="icons">
                                <HttpsIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                autoComplete="off"
                                className="param-field"
                                id="passwordConfirmation"
                                ref={password2}
                                required
                            />
                        </div>
                    </div>
                    <div className="sign-up-param">
                        <button className="sign-up-btn" type="submit">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
