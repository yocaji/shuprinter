import { Link } from 'react-router-dom';
import LoginStatus from './LoginStatus.tsx';

function Footer() {
  return (
    <footer
      className="px-4 py-12 w-full bg-stone-200
      font-solid text-sm text-sky-800 font-medium"
    >
      <div className="mx-auto max-w-screen-md flex flex-col gap-12">
        <LoginStatus />
        <div className="flex items-center gap-3">
          <Link
            className="mr-3 text-2xl font-bold font-logo rounded-sm
            outline-2 outline-amber-300 outline-offset-2 transition duration-300
            hover:opacity-70 focus:opacity-70 focus:outline"
            to={'/'}
          >
            Shuprinter
          </Link>
          <Link
            to={'/terms'}
            className="px-3 py-1 rounded-full
            outline-2 outline-amber-300 outline-offset-2 transition duration-300
            hover:bg-stone-100 focus:bg-stone-50 focus:outline"
          >
            規約とポリシー
          </Link>
          <a
            href="https://github.com/yocaji/shuprinter"
            target="_blank"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full text-2xl
              outline-2 outline-amber-300 outline-offset-2 transition duration-300
            hover:bg-stone-100 focus:bg-stone-50 focus:outline"
          >
            <span className="i-fa6-brands-github" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
