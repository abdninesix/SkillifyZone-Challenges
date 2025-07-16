import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import Banner from '../componenets/Banner';

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

  if (!post) return (
    <>
      <Banner />
      <div className="text-center mt-10">Loading...</div>
    </>
  );

  return (
    <>
      <Banner text={post.title} />
      <div className="mt-10 p-4 bg-gray-100 rounded shadow">
        <p className="text-sm text-gray-600 mb-4">by {post.userId?.username}</p>
        <p className="text-gray-800 whitespace-pre-line">{post.content}</p>

        {userId === post.userId?._id && (
          <div className="flex justify-end gap-2 text-sm mt-6">
            <Link
              to={`/edit/${post._id}`}
              className="text-myblue hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetail;
