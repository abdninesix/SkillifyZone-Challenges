import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import About from './pages/About';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-8 md:px-16 lg:px-32 xl:px-48 overflow-x-hidden duration-200">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
