import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Commponents/SignUp';
import Login from './Commponents/Login';
import HomePage from './Commponents/HomePage';
import './App.css'
import UsersList from './Commponents/UsersList';
import Nav from 'react-bootstrap/Nav';
import ForgotPassword from './Commponents/ForgotPassword';
import ResetPassword from './Commponents/ResetPassword';

const App = () => {
  const isAuthenticated = true; 

  return (
    <div>
  <div>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Fashion.S</a>
    <a class="navbar-brand" href="#">
      <img className='image' src="s-letter-logo-png-852.svg" type="icon" alt="logo" width="69" height="56"></img>
    </a>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {/* <Link to="/" className="nav-item">
          <a className="nav-link " >Home</a>
        </Link> */}
        <Link to="/" className="nav-item">
          <a className="nav-link" href="#">
            Signup</a>
        </Link>
        <Link to="login" className="nav-item">
          <a className="nav-link" href="#">Login</a>
        </Link>
      </ul>
    </div>
  </div>
</nav>
  </div>
      <Routes>
      <Route path="/" element={<SignUp />} />
        <Route path="/HomePage " element={<Navigate to="/HomePage" />} />
        <Route path='login' element={<Login/>} />
        <Route path='UsersList' element={<UsersList /> } /> 
        <Route path='forgotpssword' element={<ForgotPassword />} />
        <Route path="/reset-passwod/:id/:token" element={<ResetPassword />} />
        <Route path="/HomePage" element={isAuthenticated ? <HomePage />: <Navigate to="/login" />} />
      </Routes>
   </div>
  );
};

export default App;
