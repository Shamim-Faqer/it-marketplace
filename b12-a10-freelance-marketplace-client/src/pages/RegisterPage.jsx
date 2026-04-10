import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const isValidPassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  return hasUppercase && hasLowercase && password.length >= 6;
};

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const password = form.password.value;

    if (!isValidPassword(password)) {
      toast.error("Password must have uppercase, lowercase and minimum 6 characters.");
      return;
    }

    try {
      await register({
        name: form.name.value,
        email: form.email.value,
        photoURL: form.photoURL.value,
        password,
      });
      toast.success("Registration successful.");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Registration failed.");
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google registration successful.");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Google registration failed.");
    }
  };

  return (
    <div className="container form-wrap">
      <h2>Register</h2>
      <form className="form-card" onSubmit={handleRegister}>
        <input className="input" name="name" placeholder="Name" required />
        <input className="input" name="email" type="email" placeholder="Email" required />
        <input className="input" name="photoURL" placeholder="Photo URL" required />
        <input className="input" name="password" type="password" placeholder="Password" required />
        <button className="btn">Register</button>
        <button type="button" className="btn btn-soft" onClick={handleGoogle}>
          Continue with Google
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
