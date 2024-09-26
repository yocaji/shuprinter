import { Link } from 'react-router-dom';
import LoginStatus from './LoginStatus.tsx';

function Footer() {
  return (
    <footer
      className="px-4 py-12 w-full bg-stone-200
      font-solid text-sm text-sky-800 font-medium"
    >
      <div className="mx-auto max-w-screen-md flex justify-between">
        <div className="flex-col">
          <div className="mb-6">
            <Link
              className="text-2xl font-bold font-logo rounded-sm
              outline-2 outline-amber-300 outline-offset-2 transition duration-300
              hover:opacity-70 focus:opacity-70 focus:outline"
              to={'/'}
            >
              Shuprinter
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link
              to={'/terms'}
              className="rounded-sm outline-2 outline-amber-300 outline-offset-2 transition duration-300
              hover:opacity-70 focus:opacity-80 focus:outline"
            >
              規約とポリシー
            </Link>
            <a
              href="https://github.com/yocaji/sprintpost"
              target="_blank"
              className="w-7 h-7 inline-flex items-center justify-center text-2xl
              rounded-full outline-2 outline-amber-300 outline-offset-2 transition duration-300
              hover:opacity-70 focus:opacity-80 focus:outline"
            >
              <span className="i-fa6-brands-github" />
            </a>
          </div>
        </div>
        <div>
          <LoginStatus />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
