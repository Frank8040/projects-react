import { useState } from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav-principal">
      <div className="block md:hidden">
        <button className="block md:hidden" onClick={() => setOpen(!open)}>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" />
          </svg>
        </button>
      </div>
      <div className="navbar-links">
        <div
          className={`${open ? "block" : "hidden"
            } block md:flex md:items-center w-full lg:w-auto flex-grow-1 gap-2`}
        >
          <Link
            className="block md:inline-block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-300 focus:border-indigo-700 transition"
            to="/"
          >
            Card
          </Link>
          <Link
            className="block md:inline-block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-300 focus:border-indigo-700 transition"
            to="/nosotros"
          >
            Juego Michi
          </Link>
          <Link
            className="block md:inline-block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-300 focus:border-indigo-700 transition"
            to="/categoria"
          >
            Search Movies
          </Link>
        </div>
        <div className="tittlew">Mi Sitio</div>
      </div>
    </div>
  );
}

export default Navigation;