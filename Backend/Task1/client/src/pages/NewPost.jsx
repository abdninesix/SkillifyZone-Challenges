import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

function NewPost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', form);
      toast.success('Post created!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Post creation failed';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Post Title"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          rows="6"
          placeholder="Post Content"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Publish
        </button>
      </form>
    </div>
  );
}

export default NewPost;
