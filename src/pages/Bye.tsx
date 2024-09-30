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

    // TODO: ノートの削除に失敗した場合を考慮すること
    await reAuth(currentUser)
      .then(() => currentUser.delete())
      .then(() => {
        setIsDeleting(true);
        deleteNotes(currentUser.uid);
      })
      .then(() => setIsDeleting(false))
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className={'flex flex-col justify-between min-h-screen'}>
        <div
          className="px-4 pb-12 grow flex items-center bg-stone-100 dark:bg-slate-900
          text-sky-800 dark:text-stone-300"
        >
          <div className={'mx-auto w-full max-w-screen-md'}>
            <button
              onClick={() => navigate(-1)}
              className={'btn btn-secondary h-10 w-10'}
            >
              <span className={'i-ph-arrow-left text-lg'} />
              <span className={'sr-only'}>Back</span>
            </button>
            <div
              className="px-6 md:px-9 py-9 mt-3 rounded-lg
              bg-white dark:bg-slate-800
              border border-stone-200 dark:border-slate-700"
            >
              <h2 className={'pb-4 text-xl font-medium'}>アカウントの削除</h2>
              <div className={'leading-relaxed'}>
                <p className={'pb-4'}>
                  アカウントを削除すると、Shuprinterに保存済みのノートはすべて削除されます
                </p>
                <button
                  onClick={() => handleDeleteClick()}
                  disabled={isDeleting}
                  className={'btn btn-md btn-danger'}
                >
                  {isDeleting ? (
                    <div
                      className="animate-spin size-4
                        border-[2px] border-current border-t-transparent rounded-full text-rose-300"
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
