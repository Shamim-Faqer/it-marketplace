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

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          Freelance<span>MarketPlace</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allJobs">All Jobs</NavLink>
          <NavLink to="/addJob">Add a Job</NavLink>
          <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
          <NavLink to="/myAddedJobs">My Added Jobs</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {!user ? (
            <>
              <Link to="/login" className="btn btn-soft">
                Login
              </Link>
              <Link to="/register" className="btn">
                Register
              </Link>
            </>
          ) : (
            <>
              <img
                className="avatar"
                src={user.photoURL || "https://i.ibb.co/k6fKqKJ/default-user.png"}
                alt={user.displayName}
                title={user.displayName}
              />
              <button className="btn btn-soft" onClick={handleLogout}>
                LogOut
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
