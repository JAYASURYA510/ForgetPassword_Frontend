import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('https://resetpasw.onrender.com/logout', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
      // Handle successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
    <div className="container mt-5">
      <h2 className="mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
</svg>Welcome!</h2>
      <p>You are now logged in.</p>
      <Link to="/" variant="primary" onClick={handleLogout}>Log Out</Link>
      <Button variant="light">
      <Link to="/UsersList">UsersList</Link>
      </Button>
        </div>
    </div>
  );
};

export default HomePage;
