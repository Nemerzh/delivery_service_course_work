import React from 'react';
import {Routes, Navigate, Route, useLocation} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
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
import ShoppingCart from "./pages/shopping_cart/ShoppingCart"
import useAuth from "./hooks/useAuth";
import MainPage from "./pages/main/MainPage";
import ShoppingCartCheckOut from "./pages/shopping_cart_checkout/ShoppingCartCheckOut";
import PaymentForm from "./pages/payment/form/PaymentForm";
import PaymentSuccess from "./pages/payment/success/PaymentSuccess";
import PaymentCancel from "./pages/payment/cancel/PaymentCancel";
import Contacts from "./pages/info/Contacts";
import AboutUs from "./pages/info/AboutUs";
import DeliveryConditions from "./pages/info/DeliveryConditions";
import News from "./pages/info/News";
import Actions from "./pages/info/Actions";
import ConfidentialityRules from "./pages/info/ConfidentialityRules";
import Info from "./pages/info/Info";
import OrderHistory from "./pages/order_history/OrderHistory";
import OrderDetail from "./pages/order_history/OrderDetail";
import AvailableOrders from "./pages/courier/AvailableOrders";


function App() {
    const {isLoggedIn} = useAuth();
    const location = useLocation();
    let isNavbarVisible = true;
    if (location.pathname === '/auth/register' || location.pathname === '/auth/login' || location.pathname === '/availableorders') {
        isNavbarVisible = false;
    }

    return (
        <div>
            <Navbar visible={isNavbarVisible}/>
            <Routes>
                <Route path='/' element={<PersistLogin/>}>
                    <Route index exact element={<Home/>}></Route>
                    <Route path="shoppingcart" element={<ShoppingCart/>}></Route>
                    <Route path="checkout" element={isLoggedIn ? (<ShoppingCartCheckOut/>) : (<Navigate replace to={"/"}/>)}></Route>
                    <Route path="payment/:orderId/:totalPrice" element={isLoggedIn ? (<PaymentForm/>) : (<Navigate replace to={"/"}/>)}></Route>
                    <Route path="/payment/success/:orderId" element={isLoggedIn ? (<PaymentSuccess/>) : (<Navigate replace to={"/"}/>)}/>
                    <Route path="/payment/cancel" element={isLoggedIn ? (<PaymentCancel/>) : (<Navigate replace to={"/"}/>)}/>
                    <Route path="order_history" element={isLoggedIn ? (<OrderHistory/>) : (<Navigate replace to={"/"}/>)}/>
                    <Route path="/order_history/detail/:orderId" element={isLoggedIn ? (<OrderDetail/>) : (<Navigate replace to={"/"}/>)}/>
                    <Route path='/auth'>
                        <Route path='login' element={!isLoggedIn ? (<Login/>) : (<Navigate replace to={"/"}/>)}></Route>
                        <Route path='register'
                               element={!isLoggedIn ? (<Register/>) : (<Navigate replace to={"/"}/>)}></Route>
                        <Route path='user' element={<AuthMiddleware/>}>
                            <Route index element={<User/>}></Route>
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
