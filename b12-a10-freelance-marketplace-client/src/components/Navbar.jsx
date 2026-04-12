import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(error?.message || "Logout failed.");
    }
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allJobs">All Jobs</NavLink></li>
      <li><NavLink to="/addJob">Add a Job</NavLink></li>
      <li><NavLink to="/my-accepted-tasks">Accepted</NavLink></li>
      <li><NavLink to="/myAddedJobs">History</NavLink></li>
    </>
  );

  return (
    <header className="navbar bg-primary text-primary-content shadow-lg px-4 md:px-8 sticky top-0 z-50">
      {/* Mobile Menu (Start) */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-black tracking-tighter">
          IT Workly
        </Link>
      </div>

      {/* Desktop Menu (Center) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
          {navLinks}
        </ul>
      </div>

      {/* Actions (End) */}
      <div className="navbar-end gap-2">
        <button 
          className="btn btn-ghost btn-circle" 
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "light" ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 18v1m9-9h1m-18 0H2m3.34 3.34l.707.707m12.728-12.728l.707.707M6.34 17.66l-.707.707M17.66 6.34l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          )}
        </button>

        {!user ? (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm md:btn-md btn-outline border-white text-white hover:bg-white hover:text-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm md:btn-md bg-white text-primary border-none hover:bg-gray-200">
              Register
            </Link>
          </div>
        ) : (
          <button className="btn btn-sm md:btn-md btn-soft btn-primary" onClick={handleLogout}>
            LogOut
          </button>
        )}
      </div>
    </header>
  );
}
