import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="px-4 py-3 w-full flex flex-wrap sm:justify-start sm:flex-nowrap text-sm bg-gray-800">
      <nav className="w-full max-w-screen-md mx-auto sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            to="/ready"
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
          >
            Shuprinter
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
