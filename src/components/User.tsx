import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function User() {
  const authContext = AuthContextConsumer();

  if (!authContext) {
    console.error(`AuthContextConsumer is ${authContext}`);
    return;
  }

  const { currentUser, login, logout } = authContext;

  return (
    <>
      <div className="user_info">
        <p className="user_name">
          {currentUser && (
            <img
              className="inline-block size-[38px] rounded-full"
              src={currentUser.photoURL ?? undefined}
              alt={currentUser.displayName ?? undefined}
            />
          )}
        </p>
        <button className="login_btn" onClick={currentUser ? logout : login}>
          {currentUser ? 'logout' : 'login'}
        </button>
      </div>
    </>
  );
}

export default User;
