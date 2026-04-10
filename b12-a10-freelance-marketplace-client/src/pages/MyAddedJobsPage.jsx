import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function MyAddedJobsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["my-jobs", user.email],
    queryFn: async () => {
      const res = await api.get(`/my-jobs?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: deleteJob } = useMutation({
    mutationFn: (id) => api.delete(`/jobs/${id}?email=${user.email}`),
    onSuccess: () => {
      toast.success("Job deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-jobs", user.email] });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Delete failed."),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="container section-stack">
      <h2>My Added Jobs</h2>
      <div className="grid grid-3">
        {data.map((job) => (
          <article key={job._id} className="card">
            <img className="job-image" src={job.coverImage} alt={job.title} />
            <div className="card-body">
              <p className="chip">{job.category}</p>
              <h3>{job.title}</h3>
              <p className="summary">{job.summary}</p>
              <div className="inline-buttons">
                <Link to={`/updateJob/${job._id}`} className="btn btn-soft">
                  Update
                </Link>
                <button className="btn btn-danger" onClick={() => deleteJob(job._id)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
