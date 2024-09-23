import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function LoginStatus() {
  const authContext = AuthContextConsumer();

  if (!authContext) {
    console.error(`AuthContextConsumer is ${authContext}`);
    return;
  }

  const { currentUser, login, logout } = authContext;

  if (!currentUser) {
    return (
      <div className="user_info">
        <button
          className="px-4 py-3 inline-flex items-center
          text-sm font-medium rounded-lg bg-stone-100
          hover:bg-yellow-100 focus:bg-yellow-200 focus:ring-2 ring-offset-2 ring-amber-300"
          onClick={login}
        >
          ログイン
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div>
        <button
          className="px-2 py-1 items-center
          text-sm font-medium rounded-sm
          hover:bg-stone-300/50 focus:bg-stone-300/50"
          onClick={logout}
        >
          ログアウト
        </button>
      </div>
      <img
        className="inline-block size-[38px] rounded-full"
        src={currentUser.photoURL ?? undefined}
        alt={currentUser.displayName ?? undefined}
      />
    </div>
  );
}

export default LoginStatus;
