import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        toast.error('Failed to load post');
      }
    };

    const decodeToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    };

    fetchPost();
    decodeToken();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${id}`);
      toast.success('Post deleted!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">by {post.userId?.username}</p>
      <p className="text-gray-800 whitespace-pre-line">{post.content}</p>

      {userId === post.userId?._id && (
        <div className="flex gap-4 mt-6">
          <Link
            to={`/edit/${post._id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
