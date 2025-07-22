import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import Banner from '../components/Banner';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const res = await API.post(`/reset-password/${token}`, {
        password: form.password,
      });
      toast.success(res.data.message || 'Password reset successfully!');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to reset password';
      toast.error(msg);
    }
  };

  return (
    <>
      <Banner text="Set New Password" />
      <div className="lg:absolute top-20 right-48 max-w-md mx-auto p-4 flex flex-col bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="password"
            type="password"
            placeholder="New Password"
            className="w-full p-2 outline-none rounded bg-white"
            onChange={handleChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 outline-none rounded bg-white"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-myblue cursor-pointer text-white p-2 rounded hover:bg-hoverblue">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
