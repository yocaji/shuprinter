import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function LoginStatus() {
  const authContext = AuthContextConsumer();
  console.log(authContext?.currentUser);

  if (!authContext) {
    console.error(`AuthContextConsumer is ${authContext}`);
    return;
  }

  const { currentUser, login, logout } = authContext;

  return (
    <>
      {currentUser ? (
        <div className="user_info">
          <p className="user_name">
            <img
              className="inline-block size-[38px] rounded-full"
              src={currentUser.photoURL ?? undefined}
              alt={currentUser.displayName ?? undefined}
            />
          </p>
          <button className="login_btn" onClick={logout}>
            ログアウト
          </button>
        </div>
      ) : (
        <div className="user_info">
          <button className="login_btn" onClick={login}>
            ログイン
          </button>
        </div>
      )}
    </>
  );
}

export default LoginStatus;
