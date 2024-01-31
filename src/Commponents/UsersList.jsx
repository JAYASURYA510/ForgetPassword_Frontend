import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Styles.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://resetpasw.onrender.com/app/users', {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
         localStorage.setItem('token', data.token);
      Cookies.set('token', data.token, { expires: 70 }); // Set the cookie to expire in 70 days
        setUsers(data);
      } catch (error) {
        setError('Error fetching users: ' + error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Card className='card'>
        <h1>
          User List{' '}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
            {/* SVG path */}
          </svg>
        </h1>
        {error && <p>{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.email}</li>
          ))}
        </ul>
      <div>  <Link to="/HomePage" type="submit" variant="btn btn-outline-primary">
            back
          </Link></div>
      </Card>
    </div>
  );
};

export default UsersList;
