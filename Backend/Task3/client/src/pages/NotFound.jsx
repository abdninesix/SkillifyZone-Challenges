import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
