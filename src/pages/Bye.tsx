import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import { deleteNotes } from '../hooks/api.ts';

function Bye() {
  const authContext = AuthContextConsumer();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (!authContext?.currentUser) return; // ProtectedRouteでログインユーザーであることは保証済み
    const user = authContext.currentUser;
    const result = await deleteNotes(user.uid);
    // ノートの削除に失敗した場合のフィードバックを入れる
    if (!result) return;
    await user.delete();
  };

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="px-4 pb-12 flex items-center mx-auto max-w-screen-md font-solid text-sky-800 grow">
          <div className="px-6 md:px-9 py-9 bg-white rounded-lg border border-stone-200">
            <h2 className="pb-4 text-xl font-medium">アカウントの削除</h2>
            <p className="pb-5 leading-relaxed">
              アカウントを削除すると、Shuprinterに保存済みのノートもすべて削除されます。
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-3 rounded-full
                text-sm font-medium
                border border-stone-200
                outline-2 outline-offset-2 outline-amber-200 transition duration-300
                hover:bg-amber-100 hover:outline hover:border-transparent
                focus:bg-amber-200 focus:outline focus:border-transparent"
              >
                削除せずに戻る
              </button>
              <button
                className="px-5 py-3 rounded-full bg-rose-50
                text-sm font-medium text-rose-600
                outline-2 outline-offset-2 outline-rose-300 transition duration-300
                hover:bg-rose-100 hover:outline
                focus:bg-rose-200 focus:outline"
                onClick={() => handleDeleteClick()}
              >
                アカウントを削除する
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Bye;
