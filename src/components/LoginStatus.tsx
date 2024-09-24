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
          className="px-5 py-3 inline-flex items-center justify-center
          text-sm font-medium rounded-full bg-stone-100
          hover:bg-amber-50 hover:ring-2 ring-offset-2 ring-amber-200
          focus:bg-yellow-200 transition duration-300"
          onClick={login}
        >
          ログイン
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <div>
        <button
          className="px-3 py-2 inline-flex items-center justify-center rounded-full
          hover:bg-stone-100 focus:bg-stone-50 transition duration-300"
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
