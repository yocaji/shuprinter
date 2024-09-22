import { Link } from 'react-router-dom';
import LoginStatus from './LoginStatus.tsx';

function Footer() {
  return (
    <footer
      className="px-4 py-12 w-full bg-stone-200
      font-solid text-sm text-sky-800 font-medium"
    >
      <div className="mb-4 mx-auto max-w-screen-md">
        <Link
          className="text-2xl font-bold font-logo hover:opacity-70 focus:outline-none focus:opacity-70"
          to="/ready"
        >
          Shuprinter
        </Link>
      </div>
      <div className="mx-auto max-w-screen-md flex justify-between">
        <div className="flex gap-3">
          <Link
            to="/"
            className="hover:opacity-70 focus:outline-none focus:opacity-80"
          >
            ホーム
          </Link>
          <Link
            to="/terms"
            className="hover:opacity-70 focus:outline-none focus:opacity-80"
          >
            規約とポリシー
          </Link>
        </div>
        <div>
          <a href="https://github.com/yocaji/sprintpost" target="_blank">
            <span className="i-fa6-brands-github text-2xl" />
          </a>
          <LoginStatus />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
