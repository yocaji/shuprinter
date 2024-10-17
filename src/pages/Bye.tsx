import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import { deleteNotes } from '../hooks/api.ts';
import Footer from '../components/Footer.tsx';

function Bye() {
  const authContext = AuthContextConsumer();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  if (!authContext?.currentUser) return <Navigate to={'/'} />;
  const { currentUser, reAuth } = authContext;

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(`${currentUser.email} を削除しますか？`);
    if (!isConfirmed) return;

    try {
      await reAuth(currentUser)
        .then(() => currentUser.delete())
        .then(() => {
          setIsDeleting(true);
          deleteNotes(currentUser.uid);
        })
        .then(() => setIsDeleting(false))
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={'page'}>
        <div className={'p-4 grow'}>
          <div className={'mx-auto w-full max-w-screen-md space-y-4'}>
            <button
              onClick={() => navigate(-1)}
              className={'btn btn-secondary btn-md w-10'}
            >
              <span className={'i-ph-arrow-left text-lg'} />
              <span className={'sr-only'}>Back</span>
            </button>
            <div className={'sheet'}>
              <h2 className={'pb-4 text-xl font-medium'}>アカウントの削除</h2>
              <div className={'leading-relaxed'}>
                <p className={'pb-4'} data-testid={'explanation'}>
                  アカウントを削除すると、Shuprinterに保存済みのノートはすべて削除されます
                </p>
                <button
                  onClick={() => handleDeleteClick()}
                  disabled={isDeleting}
                  className={'btn btn-md px-4 btn-danger'}
                >
                  {isDeleting ? (
                    <div
                      className={
                        'spinner size-4 border-rose-300 border-t-transparent'
                      }
                      role={'status'}
                      aria-label={'loading'}
                    >
                      <span className={'sr-only'}>Loading...</span>
                    </div>
                  ) : (
                    'アカウントを削除する'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Bye;
