import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            to="/ready"
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
          >
            SprintPost
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
