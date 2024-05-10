import React from 'react';
import { Routes, Navigate, Route, useLocation } from 'react-router-dom';
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import User from './pages/auth/User';
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  let isNavbarVisible = true;
  if (location.pathname === '/auth/register' || location.pathname === '/auth/login') {
    isNavbarVisible = false;
  }

  return (
    <div>
      <Navbar visible={isNavbarVisible}/>
      <Routes>
        <Route path='/' element={<PersistLogin />}>
          <Route index exact element={<Home />}></Route>
          <Route path='/auth'>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='user' element={<AuthMiddleware />}>
              <Route index element={<User />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
      <Footer visible={isNavbarVisible}/>

    </div>
  );
}

export default App;
