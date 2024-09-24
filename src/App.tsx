import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import News from './pages/News.tsx';
import NotFound from './pages/NotFound.tsx';
import Page from './pages/Page.tsx';
import { AuthContextProvider } from './contexts/AuthContext.tsx';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Page />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
