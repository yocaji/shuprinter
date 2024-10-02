import { Link } from 'react-router-dom';
import LoginStatus from './LoginStatus.tsx';

function Footer() {
  return (
    <footer
      className={'px-4 py-12 w-full bg-stone-200 dark:bg-sky-950 text-sm'}
    >
      <div className={'mx-auto max-w-screen-md flex flex-col gap-12'}>
        <LoginStatus />
        <div className={'flex items-center gap-3'}>
          <Link
            className="mr-3 text-2xl font-bold font-logo rounded-sm
            outline-2 outline-amber-300 outline-offset-2 transition duration-300
            hover:opacity-70 focus:opacity-70 focus:outline"
            to={'/'}
          >
            Shuprinter
          </Link>
          <Link to={'/terms'} className={'btn btn-on-footer px-3 py-1'}>
            規約とポリシー
          </Link>
          <a
            href={'https://github.com/yocaji/shuprinter'}
            target={'_blank'}
            className={'btn btn-on-footer w-8 h-8 text-2xl'}
          >
            <span className={'i-fa6-brands-github'} />
            <span className={'sr-only'}>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
