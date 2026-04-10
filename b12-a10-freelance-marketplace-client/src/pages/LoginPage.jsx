import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await login({
        email: form.email.value,
        password: form.password.value,
      });
      toast.success("Login successful.");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.message || "Login failed.");
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google login successful.");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.message || "Google login failed.");
    }
  };

  return (
    <div className="container form-wrap">
      <h2>Login</h2>
      <form className="form-card" onSubmit={handleLogin}>
        <input className="input" name="email" type="email" placeholder="Email" required />
        <input className="input" name="password" type="password" placeholder="Password" required />
        <p className="muted">Forget Password</p>
        <button className="btn">Login</button>
        <button type="button" className="btn btn-soft" onClick={handleGoogle}>
          Continue with Google
        </button>
        <p>
          New here? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
