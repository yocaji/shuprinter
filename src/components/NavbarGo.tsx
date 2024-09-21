import { Link } from 'react-router-dom';

interface NavbarGoProps {
  isSaved: boolean;
}

function Navbar({ isSaved }: NavbarGoProps) {
  const handleReturnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSaved) return;
    const isConfirmed = window.confirm('変更を保存せずに戻りますか？');
    if (isConfirmed) return;
    e.preventDefault();
  };

  return (
    <header
      className="px-4 py-2 w-full
      flex flex-wrap sm:justify-start sm:flex-nowrap
      bg-gray-100"
    >
      <div
        className="w-full max-w-screen-md mx-auto 
        sm:flex sm:items-center sm:justify-between"
      >
        <div className="flex items-center justify-between">
          <Link
            to="/ready"
            onClick={handleReturnClick}
            className="px-2 py-1 flex-none rounded-lg
            text-xl text-gray-700
            hover:bg-yellow-300 focus:outline-none focus:bg-yellow-300"
          >
            <span className="i-ph-arrow-left-light" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
