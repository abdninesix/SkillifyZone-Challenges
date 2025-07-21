import React from 'react';

const ResetPassword = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form>
        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
