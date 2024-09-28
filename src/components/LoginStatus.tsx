import { AuthContextConsumer } from '../contexts/AuthContext.tsx';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.tsx';

function LoginStatus() {
  const authContext = AuthContextConsumer();

  if (!authContext) {
    console.error(`AuthContextConsumer is ${authContext}`);
    return;
  }

  const { currentUser, login, logout } = authContext;

  if (!currentUser) {
    return (
      <div className={'flex items-center gap-1 text-sm font-medium'}>
        <button
          className={'px-5 py-3 bg-stone-50 dark:bg-slate-950 btn-secondary'}
          onClick={login}
        >
          ログイン
        </button>
        <ThemeSwitcher />
      </div>
    );
  }

  return (
    <div className={'flex items-center gap-1 text-sm font-medium'}>
      <img
        className={'me-2 size-[32px] rounded-full'}
        src={currentUser.photoURL ?? undefined}
        alt={currentUser.displayName ?? undefined}
      />
      <button className={'px-3 py-1 link-footer'} onClick={logout}>
        ログアウト
      </button>
      <Link to={'/bye'} className={'px-3 py-1 link-footer'}>
        アカウント削除
      </Link>
      <ThemeSwitcher />
    </div>
  );
}

export default LoginStatus;
