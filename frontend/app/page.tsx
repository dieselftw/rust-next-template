'use client'

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
    fetch('http://localhost:8080/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='bg-white'>
      <h1>User</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={getUsers}>Get user!</button>
    </div>
  );
};

export default UserList;
