import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-slate-100">
      <div className="flex items-center justify-between max-w-6xl mx-auto h-[60px] px-3">
        <h1 className="md:text-3xl font-extrabold">
          <span className="text-blue-500">Real</span>
          <span className="text-blue-800">State</span>
        </h1>
        <form className="flex items-center bg-slate-200 py-2 px-4 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none"
          />
          <Search />
        </form>
        <nav>
          <ul className="flex items-center gap-4 sm:gap-10 md:gap-14">
            <li className="hidden md:block">
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
