import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

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
    <header className="navbar bg-primary glass text-white font-semibold shadow-lg px-4 md:px-8 sticky top-0 z-50">
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
