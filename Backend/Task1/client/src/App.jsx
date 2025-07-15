import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Navbar from './componenets/Navbar';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          <Route path="/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
