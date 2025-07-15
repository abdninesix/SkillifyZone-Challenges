import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data.reverse()))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">by {post.userId?.username}</p>
            <p className="mt-2 text-gray-700">{post.content.slice(0, 100)}...</p>
            <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              Read more
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
