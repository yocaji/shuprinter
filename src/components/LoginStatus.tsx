import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import { Link } from 'react-router-dom';

function LoginStatus() {
  const authContext = AuthContextConsumer();

  if (!authContext) {
    console.error(`AuthContextConsumer is ${authContext}`);
    return;
  }

  const { currentUser, login, logout } = authContext;

  if (!currentUser) {
    return (
      <div>
        <button
          className="px-5 py-3 inline-flex items-center justify-center
          text-sm font-medium rounded-full bg-stone-100
          outline-2 outline-amber-300 outline-offset-2 transition duration-300
          hover:bg-amber-100 hover:outline
          focus:bg-amber-200 focus:outline"
          onClick={login}
        >
          ログイン
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <img
        className="me-2 size-[32px] rounded-full"
        src={currentUser.photoURL ?? undefined}
        alt={currentUser.displayName ?? undefined}
      />
      <button
        className="px-3 py-1 rounded-full
        outline-2 outline-amber-300 outline-offset-2 transition duration-300
        hover:bg-stone-100 focus:bg-stone-50 focus:outline"
        onClick={logout}
      >
        ログアウト
      </button>
      <Link
        to={'/bye'}
        className="px-3 py-1 rounded-full
        outline-2 outline-amber-300 outline-offset-2 transition duration-300
        hover:bg-stone-100 focus:bg-stone-50 focus:outline"
      >
        アカウント削除
      </Link>
    </div>
  );
}

export default LoginStatus;
