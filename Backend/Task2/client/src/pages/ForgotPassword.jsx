import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
