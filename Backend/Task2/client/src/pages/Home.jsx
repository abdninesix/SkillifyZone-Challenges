import React from 'react';
import Banner from '../components/Banner';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user = decoded;
    } catch (err) {
      console.error('Invalid token', err);
    }
  }

  return (
    <>
      <Banner text="Dashboard" />
      <div className='flex flex-col items-center justify-center'>
        <div className="flex flex-col items-center justify-center mt-10 space-y-4 bg-gray-100 p-6 rounded shadow text-gray-700">
          <h2 className="text-3xl font-bold">Welcome, {user?.username || 'User'}!</h2>
          <p><strong>Your Email:</strong> {user?.email || 'Not available'}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
