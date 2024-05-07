import React from 'react';
import {useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {axiosInstance} from '../../api/apiConfig'
import useAuth from "../../hooks/useAuth"

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

            navigate('/auth/login')
        } catch (error) {
            setLoading(false)

        }
    }

    return (
        <div className='container'>
            <a href="/">
                <img src="/../static/images/5.png" className="logotype" alt="logotype"/>
            </a>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="register-header">First Name</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        className="form-control"
                        id="first_name"
                        ref={first_name}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="register-header">Last Name</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        className="form-control"
                        id="last_name"
                        ref={last_name}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="register-header">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        className="form-control"
                        id="email"
                        ref={email}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_number" className="register-header">Phone number</label>
                    <input
                        type="text"
                        placeholder="Phone number"
                        autoComplete="off"
                        className="form-control"
                        id="phone_number"
                        ref={phone_number}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="register-header">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        className="form-control"
                        id="password"
                        ref={password}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirmation" className="register-header">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="off"
                        className="form-control"
                        id="passwordConfirmation"
                        ref={password2}
                        required
                    />
                </div>
                <div className="mb-3">
                    <button disabled={loading} className="btn btn-success" type="submit">
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    )
}
