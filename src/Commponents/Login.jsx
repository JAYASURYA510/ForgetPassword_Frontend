import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import PasswordResetForm from './ResetPassword';
import HashLoader from "react-spinners/HashLoader";
import Cookies from 'js-cookie';



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('https://resetpasw.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Set error message
        setLoading(false); // Set loading to false
        return; // Stop further execution
      }

      const data = await response.json();
      console.log(data.message); // Logged in successfully
      // Handle successful login, e.g., store JWT token in local storage


      localStorage.setItem('token', data.token);
      Cookies.set('token', data.token, { expires: 70 }); // Set the cookie to expire in 70 days


      navigate('/HomePage');
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div className='bg-secondary vh-100'>
      {loading && ( // Show loading animation and overlay if loading is true
        <div className="loading-overlay">
          <HashLoader color="#1EA7FD" />
        </div>
      )}
        <h1 className='text-center'>Wecome To Fashion.S......!</h1>
      <p className='text-center'>Login To Continue</p>
    <Card className='container mt-5'>
    <img src="s-letter-logo-png-852.svg" className='center' type="icon" alt="logo" width="70" height="60" />
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
          <Button  className="mt-2" variant="btn btn-outline-primary" type="submit">
            Login
          </Button>
       
      </Form>
      <p className="mt-3">
        Don't have an account? <Link to="/">Sign up here</Link>
      </p>
      <Link to="/forgotpssword">Forget Password</Link>
      
    </Card></div>
  );
};

export default Login;
