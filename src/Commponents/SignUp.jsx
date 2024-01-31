import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles.css';
import HashLoader from "react-spinners/HashLoader";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('https://resetpasw.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMessage(data.message);
      setLoading(false);
      navigate('/login');

    } catch (error) {
      setError(error.message); // Display the error message from the backend
      setLoading(false);
    }
  };

  return (
    <div className='bg-secondary vh-100'>
      {loading && ( // Show loading animation and overlay if loading is true
        <div className="loading-overlay">
          <HashLoader color="#36d7b7" />
        </div>
      )}
      <div>
        <h1 className='text-center'>Welcome To Fashion.S......!</h1>
        <p className='text-center'>Sign Up To Continue</p>
      </div>
      <Card className='container mt-5'>
        <img src="s-letter-logo-png-852.svg" className='center' type="icon" alt="logo" />

        <h2 className="mb-4">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>} {/* Display the error message */}
          {message && <Alert variant="success">{message}</Alert>} {/* Display the success message */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" autoComplete='off' value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Form.Group>
          <Button className="mt-2" variant="btn btn-outline-primary" type="submit">
            Sign up
          </Button>
          <br />
          {message && <p>{message}</p>}
        </Form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
