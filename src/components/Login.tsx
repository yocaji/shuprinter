import { AuthContextConsumer } from '../contexts/AuthContext.tsx';

function Login() {
  const authContext = AuthContextConsumer();
  console.log(authContext?.currentUser);

  if (!authContext) {
    console.error(`AuthContextConsumer is ${authContext}`);
    return;
  }

  const { currentUser, login, logout } = authContext;

  return (
    <>
      <div className="user_info">
        <button className="login_btn" onClick={currentUser ? logout : login}>
          {currentUser ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
    </>
  );
}

export default Login;
