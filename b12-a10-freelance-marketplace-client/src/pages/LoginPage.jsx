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
      await login(form.email.value, form.password.value);
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
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
        <div className="card-body p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Welcome Back</h2>
            <p className="text-base-content/60 text-sm mt-2 font-medium">Please enter your details to login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/70">Email Address</span>
              </label>
              <input 
                name="email" 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered focus:input-primary transition-all font-medium" 
                required 
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1 flex justify-between">
                <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/70">Password</span>
                <span className="label-text-alt link link-hover text-primary font-bold text-[10px] uppercase">Forgot Password?</span>
              </label>
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered focus:input-primary transition-all" 
                required 
              />
            </div>

            {/* Login Button */}
            <button className="btn btn-primary btn-block text-white font-black uppercase shadow-lg shadow-primary/20 mt-4">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-[10px] font-bold uppercase text-base-content/40 my-8 italic">Or Continue With</div>

          {/* Social Login */}
          <button 
            type="button" 
            className="btn btn-outline btn-block border-base-300 hover:bg-base-200 hover:text-base-content gap-3 font-bold uppercase" 
            onClick={handleGoogle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Google
          </button>

          {/* Footer Link */}
          <p className="text-center mt-10 text-sm font-medium text-base-content/60 italic">
            New here? <Link to="/register" className="link link-primary font-black not-italic ml-1">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
