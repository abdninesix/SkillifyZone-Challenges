import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-8 md:px-16 lg:px-32 xl:px-48 overflow-x-hidden duration-200">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
