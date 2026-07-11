import { Routes, Route } from 'react-router-dom';
import { useLanguage } from './lib/LanguageContext';

import Home from './pages/Home';
import Trainer from './pages/Trainer';
import Casino from './pages/Casino';
import About from './pages/About';
import HowToCount from './pages/HowToCount';

export default function App() {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-to-count" element={<HowToCount />} />
      </Routes>

    </>
  );
}
