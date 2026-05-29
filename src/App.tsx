import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Casino from './pages/Casino';
import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trainer" element={<Trainer />} />
      <Route path="/casino" element={<Casino />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
