import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Start from '../components/Start.tsx';
import Notes from '../components/Notes.tsx';
import Footer from '../components/Footer.tsx';

function Home() {
  const authContext = AuthContextConsumer();

  return (
    <>
      <Start />
      {authContext?.currentUser ? <Notes /> : null}
      <Footer />
    </>
  );
}

export default Home;
