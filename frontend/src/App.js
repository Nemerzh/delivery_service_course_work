import React from 'react';
import {Routes, Navigate, Route, useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import User from './pages/auth/User';
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeedbackPage from "./pages/feedback/FeedbackPage";
import FeedbackAdd from "./pages/feedback/FeedbackAdd";
import ShoppingCart from "./pages/ShoppingCart"
import useAuth from "./hooks/useAuth";
import MainPage from "./pages/main/MainPage";
import ShoppingCartCheckOut from "./pages/ShoppingCartCheckOut";
import PaymentForm from "./pages/PaymentForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Contacts from "./pages/info/Contacts";
import AboutUs from "./pages/info/AboutUs";
import DeliveryConditions from "./pages/info/DeliveryConditions";
import News from "./pages/info/News";
import Actions from "./pages/info/Actions";
import ConfidentialityRules from "./pages/info/ConfidentialityRules";
import Info from "./pages/info/Info";
import AvailableOrders from "./pages/courier/AvailableOrders";

function App() {
    const {isLoggedIn} = useAuth();
    const location = useLocation();
    let isNavbarVisible = true;
    if (location.pathname === '/auth/register' || location.pathname === '/auth/login') {
        isNavbarVisible = false;
    }

    return (
        <div>
            <Navbar visible={isNavbarVisible}/>
            <Routes>
                <Route path='/' element={<PersistLogin/>}>
                    <Route index exact element={<Home/>}></Route>
                    <Route path="shoppingcart" element={<ShoppingCart/>}></Route>
                    <Route path="checkout" element={<ShoppingCartCheckOut/>}></Route>
                    <Route path="payment/:orderId" element={<PaymentForm />}></Route>
                    <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
                    <Route path="/payment/cancel" element={<PaymentCancel />} />
                    <Route path='/auth'>
                        <Route path='login' element={!isLoggedIn ? (<Login/>) : (<Navigate replace to={"/"}/>)}></Route>
                        <Route path='register'
                               element={!isLoggedIn ? (<Register/>) : (<Navigate replace to={"/"}/>)}></Route>
                        <Route path='user' element={isLoggedIn ? (<AuthMiddleware/>) : (<Navigate to={"../login"}/>)}>
                            <Route index element={isLoggedIn ? (<User/>) : (<Navigate to={"../login"}/>)}></Route>
                        </Route>
                    </Route>

                    <Route path='/feedback'>
                        <Route path='list' element={<FeedbackPage/>}/>
                        <Route path='add' element={isLoggedIn ? (<FeedbackAdd/>) : (<Navigate replace to={"/"}/>)}/>
                    </Route>

                    <Route path='/main' element={<MainPage/>}/>
                    <Route path='/contacts' element={<Contacts/>}/>
                    <Route path='/aboutus' element={<AboutUs/>}/>
                    <Route path='/deliveryconditions' element={<DeliveryConditions/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/actions' element={<Actions/>}/>
                    <Route path='/confidentialityrules' element={<ConfidentialityRules/>}/>
                    <Route path='/info' element={<Info/>}/>

                    <Route path='/availableorders' element={<AvailableOrders/>}/>
                </Route>

                <Route path='*' element={<Navigate to='/'/>}></Route>
            </Routes>
            <Footer visible={isNavbarVisible}/>
            <ToastContainer/>

        </div>
    );
}

export default App;
