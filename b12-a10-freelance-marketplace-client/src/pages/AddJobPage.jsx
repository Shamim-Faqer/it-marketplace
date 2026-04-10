import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";

export default function AddJobPage() {
  const { user } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.post("/jobs", payload),
    onSuccess: () => toast.success("New job added successfully."),
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to add job."),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      title: form.title.value.trim(),
      postedBy: user.displayName,
      category: form.category.value,
      summary: form.summary.value.trim(),
      coverImage: form.coverImage.value.trim(),
      userEmail: user.email,
    };
    mutate(payload);
    form.reset();
  };

  return (
    <div className="container form-wrap">
      <h2>Add a New Job</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <input className="input" name="title" placeholder="Job title" required />
        <input className="input" value={user.displayName} readOnly />
        <select className="input" name="category" required>
          <option value="">Select Category</option>
          <option>Web Development</option>
          <option>Digital Marketing</option>
          <option>Graphics Designing</option>
          <option>Content Writing</option>
          <option>Video Editing</option>
        </select>
        <textarea className="input" name="summary" placeholder="Summary" required rows={5} />
        <input className="input" name="coverImage" placeholder="Cover image URL" />
        <input className="input" value={user.email} readOnly />
        <button className="btn" disabled={isPending}>
          {isPending ? "Saving..." : "Add Job"}
        </button>
      </form>
    </div>
  );
}
