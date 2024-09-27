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
          text-sm font-medium rounded-full bg-stone-100 dark:bg-slate-900
          outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-950
          transition duration-300
          hover:bg-amber-100 dark:hover:bg-slate-900 hover:outline
          focus:bg-amber-200 dark:focus:bg-sky-950 focus:outline"
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
        outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-950
        transition duration-300
        hover:bg-stone-100 dark:hover:bg-slate-900
        focus:bg-stone-50 dark:focus:bg-sky-950 focus:outline"
        onClick={logout}
      >
        ログアウト
      </button>
      <Link
        to={'/bye'}
        className="px-3 py-1 rounded-full
        outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-950
        transition duration-300
        hover:bg-stone-100 dark:hover:bg-slate-900
        focus:bg-stone-50 dark:focus:bg-sky-950 focus:outline"
      >
        アカウント削除
      </Link>
    </div>
  );
}

export default LoginStatus;
