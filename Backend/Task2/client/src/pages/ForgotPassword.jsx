import { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api/axios';
import Banner from '../components/Banner';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/forgot-password', { email });
      toast.success(res.data.message || 'Password reset email sent!');
      setEmail('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send reset email';
      toast.error(msg);
    }
  };

  return (
    <>
      <Banner text="Forgot Password?" />
      <div className="lg:absolute top-20 right-48 max-w-md mx-auto p-4 flex flex-col bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 outline-none rounded bg-white"
            required
          />
          <button type="submit" className="w-full bg-myblue cursor-pointer text-white p-2 rounded hover:bg-hoverblue">
            Send Reset Link
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
