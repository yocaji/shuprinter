import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Start from '../components/Start.tsx';
import Notes from '../components/Notes.tsx';
import Footer from '../components/Footer.tsx';

function Home() {
  const authContext = AuthContextConsumer();

  return (
    <>
      <div
        className={
          'flex flex-col justify-between min-h-svh text-sky-800 dark:text-stone-300'
        }
      >
        <div
          className={
            'px-4 py-12 bg-stone-50 dark:bg-slate-800 border-t-4 border-amber-300 font-hand'
          }
        >
          <Start />
        </div>
        <div className={'px-4 py-6 grow flex bg-stone-100 dark:bg-slate-900'}>
          {authContext?.currentUser ? <Notes /> : <div />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
