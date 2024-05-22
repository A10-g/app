import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUsersApi = "http://localhost:3000/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(getUsersApi);
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <h2>User List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;
