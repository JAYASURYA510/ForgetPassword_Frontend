import React, { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Styles.css';
import HashLoader from "react-spinners/HashLoader";
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';






function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false); // Add loading state
  const [parms ] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    axios.post(`https://forget-password-backend.onrender.com/reset-password/${parms.get("id")}/${parms.get("token")}`, { password })
      .then((res) => {
        if (res.data.Status === 'Password reset Success') {
        
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
       {loading && ( // Show loading animation and overlay if loading is true
        <div className="loading-overlay">
          <HashLoader color="#36d7b7" />
        </div>
      )}
      <div >
        <Card className='container mt-5'>
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="btn btn-outline-primary">
            Update
          </Button>
        </form></Card>
      </div>
    </div>
  );
}

export default ResetPassword;
