import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Start from '../components/Start.tsx';
import Notes from '../components/Notes.tsx';
import Footer from '../components/Footer.tsx';

function Home() {
  const authContext = AuthContextConsumer();

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen text-sky-800">
        <Start />
        <div className="px-4 py-6 grow flex bg-stone-100">
          {authContext?.currentUser ? <Notes /> : <div />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
