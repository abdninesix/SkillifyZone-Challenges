import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import Banner from '../componenets/Banner';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data.reverse()))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="space-y-4">
      <Banner text="Latest Blogs" />
      <div className='flex flex-wrap gap-4'>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="w-72 h- p-4 flex flex-col bg-gray-100 rounded shadow">
              <div className='w-full mb-2 rounded-md overflow-hidden bg-white flex items-center justify-center'><img src="/cover.png" alt="cover" className='object-cover' /></div>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-xs text-gray-500">by {post.userId?.username}</p>
              <p className="mt-2 text-sm text-gray-700">{post.content.slice(0, 100)}...</p>
              <Link to={`/post/${post._id}`} className="text-sm text-myblue hover:underline mt-auto ml-auto">
                Read more
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
