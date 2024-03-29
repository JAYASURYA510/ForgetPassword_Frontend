import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from 'react-bootstrap/Button';


function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://forget-password-backend.onrender.com/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
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
            /><p>Note:Enter Gmail Id , Gmail Recurresd</p>
          </div>
          <Button type="submit" variant="btn btn-outline-primary" >
            Send
          </Button>
          </form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;
