import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import News from './pages/News.tsx';
import NotFound from './pages/NotFound.tsx';
import Ready from './pages/Ready.tsx';
import Note from './pages/Note.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/ready" element={<Ready />} />
        <Route path="/note" element={<Note />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
