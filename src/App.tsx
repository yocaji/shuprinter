import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Track from './pages/Track.tsx';
import News from './pages/News.tsx';
import Bye from './pages/Bye.tsx';
import NotFound from './pages/NotFound.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { AuthContextConsumer } from './contexts/AuthContext.tsx';

function App() {
  const authContext = AuthContextConsumer();
  const isUser = !!authContext?.currentUser;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/news" element={<News />} />
        <Route element={<ProtectedRoute isUser={isUser} />}>
          <Route path="/bye" element={<Bye />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
