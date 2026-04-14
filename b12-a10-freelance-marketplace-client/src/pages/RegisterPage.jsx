import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth"; // আপনার হুক এর পাথ অনুযায়ী

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // পাসওয়ার্ড ভ্যালিডেশন ফাংশন (যদি অন্য কোথাও না থাকে)
  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return password.length >= 6 && hasUpperCase && hasLowerCase;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value?.trim();

    if (!isValidPassword(password)) {
      toast.error("Password must include A-Z, a-z & 6+ chars");
      return;
    }

    try {
      // এখানে register ফাংশনটি কল করা হচ্ছে
      await register(name, email, password, "");

      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="text-2xl font-bold text-center">Register Now</h2>
          <div className="form-control">
            <label className="label">Name</label>
            <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">Password</label>
            <input name="password" type="password" placeholder="Password" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// এই লাইনটি অত্যন্ত গুরুত্বপূর্ণ (এটি না থাকলে রুট এরর দিবে)
export default RegisterPage;
