import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import Footer from '../components/Footer.tsx';
import { deleteNotes } from '../hooks/api.ts';

function Bye() {
  const authContext = AuthContextConsumer();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isReAuthed, setIsReAuthed] = useState<boolean>(false);

  const user = authContext?.currentUser;
  if (!user) return navigate('/');

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
        <div className="grow flex items-center bg-stone-100 text-sky-800 font-solid">
          <div className="px-4 pb-12 mx-auto max-w-screen-md">
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 mb-3 rounded-full flex items-center justify-center
                text-xl
                border border-stone-200
                outline-2 outline-offset-2 outline-amber-200 transition duration-300
                hover:bg-amber-100 hover:outline hover:border-transparent
                focus:bg-amber-200 focus:outline focus:border-transparent"
            >
              <span className="i-ph-arrow-left-light" />
            </button>
            <div className="px-6 md:px-9 py-9 bg-white rounded-lg border border-stone-200">
              <h2 className="pb-4 text-xl font-medium">アカウントの削除</h2>
              <div className="leading-relaxed">
                <p className="pb-4">
                  アカウントを削除すると、Shuprinterに保存済みのノートはすべて削除されます
                </p>
                {isReAuthed ? (
                  <button
                    onClick={() => handleDeleteClick()}
                    disabled={isDeleting}
                    className="px-4 py-2 md:px-5 md:py-3 rounded-full bg-rose-50
                    text-sm font-medium text-rose-600
                    outline-2 outline-offset-2 outline-rose-300 transition duration-300
                    hover:bg-rose-100 hover:outline
                    focus:bg-rose-200 focus:outline
                    disabled:pointer-events-none"
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
                    <hr className="mb-5" />
                    <p className="pb-4">
                      この操作を続けるには
                      <span className="px-1 font-medium">{user.email}</span>
                      で再ログインしてください
                    </p>
                    <button
                      onClick={() => handleReAuthClick()}
                      className="px-4 py-2 md:px-5 md:py-3 rounded-full flex items-center gap-2
                    text-sm font-medium
                    border border-stone-200
                    outline-2 outline-offset-2 outline-amber-200 transition duration-300
                    hover:bg-amber-100 hover:outline hover:border-transparent
                    focus:bg-amber-200 focus:outline focus:border-transparent"
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
