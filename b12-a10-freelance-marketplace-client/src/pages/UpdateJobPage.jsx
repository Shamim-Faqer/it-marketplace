import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function UpdateJobPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job-update", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.put(`/jobs/${id}?email=${user.email}`, payload),
    onSuccess: () => {
      toast.success("Job updated successfully.");
      navigate("/myAddedJobs");
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Update failed."),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    mutate({
      title: form.title.value.trim(),
      category: form.category.value,
      summary: form.summary.value.trim(),
      coverImage: form.coverImage.value.trim(),
    });
  };

  if (isLoading) return <Spinner />;
  if (!job) return <p className="container">Job not found.</p>;

  return (
    <div className="container form-wrap">
      <h2>Update Job</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <input className="input" name="title" defaultValue={job.title} required />
        <select className="input" name="category" defaultValue={job.category} required>
          <option>Web Development</option>
          <option>Digital Marketing</option>
          <option>Graphics Designing</option>
          <option>Content Writing</option>
          <option>Video Editing</option>
        </select>
        <textarea className="input" name="summary" rows={5} defaultValue={job.summary} required />
        <input className="input" name="coverImage" defaultValue={job.coverImage} required />
        <button className="btn" disabled={isPending}>
          {isPending ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
