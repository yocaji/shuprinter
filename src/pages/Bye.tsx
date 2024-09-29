import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import { deleteNotes } from '../hooks/api.ts';
import Footer from '../components/Footer.tsx';

function Bye() {
  const authContext = AuthContextConsumer();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isReAuthed, setIsReAuthed] = useState<boolean>(false);

  const user = authContext?.currentUser;
  if (!user) return <Navigate to={'/'} />;

  const handleReAuthClick = async () => {
    try {
      await authContext.login();
      setIsReAuthed(true);
    } catch (error) {
      console.error('Reauthentication failed: ', error);
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(`${user.email} を削除しますか？`);
    if (!isConfirmed) return;
    setIsDeleting(true);
    const result = await deleteNotes(user.uid);
    // ノートの削除に失敗した場合のフィードバックを入れる
    if (!result) return;
    await user.delete();
    setIsDeleting(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div
          className="px-4 pb-12 grow flex items-center bg-stone-100 dark:bg-slate-900
          text-sky-800 dark:text-stone-300 font-solid"
        >
          <div className="mx-auto w-full max-w-screen-md">
            <button
              onClick={() => navigate(-1)}
              className={'h-10 w-10 rounded-full text-xl btn-secondary'}
            >
              <span className="i-ph-arrow-left-light" />
              <span className="sr-only">Back</span>
            </button>
            <div
              className="px-6 md:px-9 py-9 mt-3 rounded-lg
              bg-white dark:bg-slate-800
              border border-stone-200 dark:border-slate-700"
            >
              <h2 className="pb-4 text-xl font-medium">アカウントの削除</h2>
              <div className="leading-relaxed">
                <p className="pb-4">
                  アカウントを削除すると、Shuprinterに保存済みのノートはすべて削除されます
                </p>
                {isReAuthed ? (
                  <button
                    onClick={() => handleDeleteClick()}
                    disabled={isDeleting}
                    className={
                      'px-4 py-2 md:px-5 md:py-3 text-sm font-medium btn-danger'
                    }
                  >
                    {isDeleting ? (
                      <div
                        className="animate-spin size-4
                        border-[2px] border-current border-t-transparent rounded-full text-rose-300"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      'アカウントを削除する'
                    )}
                  </button>
                ) : (
                  <>
                    <hr className="mb-5 dark:border-slate-800" />
                    <p className="pb-4">
                      この操作を続けるには
                      <span className="px-1 font-medium">{user.email}</span>
                      で再ログインしてください
                    </p>
                    <button
                      onClick={() => handleReAuthClick()}
                      className={
                        'px-4 py-2 md:px-5 md:py-3 text-sm font-medium gap-2 btn-secondary'
                      }
                    >
                      <span className="i-fa6-brands-google" />
                      再ログイン
                    </button>
                  </>
                )}
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
