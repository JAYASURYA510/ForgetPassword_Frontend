import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://forget-password-backend.onrender.com/forgot-password', { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    };

    const handleSend = () => {
        if (email.endsWith('@gmail.com')) {
            alert('Warning: Gmail id Recurred please enter, Gmail id.');
        } else {
            handleSubmit();
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className='card'>
                <h4>Forgot Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button type="button" variant="btn btn-outline-primary" onClick={handleSend}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
