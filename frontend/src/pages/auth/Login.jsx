import React, {useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {axiosInstance} from '../../api/apiConfig'
import useAuth from '../../hooks/useAuth'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HttpsIcon from '@mui/icons-material/Https';

export default function Login() {

    const {setAccessToken, setCSRFToken, setIsLoggedIn} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const fromLocation = location?.state?.from?.pathname || '/'
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstance.post('api/login', JSON.stringify({
                email,
                password
            }))

            setAccessToken(response?.data?.access_token)
            setCSRFToken(response.headers["x-csrftoken"])
            setIsLoggedIn(true);
            setEmail()
            setPassword()
            setLoading(false)

            navigate(fromLocation, {replace: true})
        } catch (error) {
            setLoading(false)

        }
    }

    return (
        <div className='container'>
            <a href="/">
                <img src="/../static/images/5.png" className="logotype" alt="logotype"/>
            </a>
            <div className="login-container">
                <h3 className="login-form-label">Login</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="login-param">
                        <div className="login-param-container">
                            <div className="icons">
                                <MailOutlineIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input type="email"
                                   placeholder='Email'
                                   autoComplete='off'
                                   className='param-field'
                                   id="email"
                                   onChange={onEmailChange}/>
                        </div>
                    </div>
                    <div className="login-param">
                        <div className="login-param-container">
                            <div className="icons">
                                <HttpsIcon style={{width: '30px', height: '30px'}}/>
                            </div>
                            <input type="password"
                                   placeholder='Password'
                                   autoComplete='off'
                                   className='param-field'
                                   id="password"
                                   onChange={onPasswordChange}/>
                        </div>
                    </div>

                    <div className="login-param">
                        <button disabled={loading} className='login-btn' type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
