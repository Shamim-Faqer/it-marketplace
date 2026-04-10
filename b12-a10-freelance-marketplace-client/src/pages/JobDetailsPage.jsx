import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

export default function JobDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: job, isLoading, refetch } = useQuery({
    queryKey: ["job-details", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data;
    },
  });

  const { mutate: acceptJob, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        jobId: id,
        accepterEmail: user.email,
        accepterName: user.displayName,
      };
      return api.post("/accepted-tasks", payload);
    },
    onSuccess: () => {
      toast.success("Job accepted successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Could not accept this job.");
    },
  });

  if (isLoading) return <Spinner />;
  if (!job) return <p className="container">Job not found.</p>;

  const isOwnJob = job.userEmail === user.email;

  return (
    <div className="container">
      <article className="details-card">
        <img className="details-image" src={job.coverImage} alt={job.title} />
        <div className="details-content">
          <p className="chip">{job.category}</p>
          <h2>{job.title}</h2>
          <p className="muted">Posted by: {job.postedBy}</p>
          <p>{job.summary}</p>
          <button className="btn" disabled={isOwnJob || isPending} onClick={() => acceptJob()}>
            {isOwnJob ? "You cannot accept your own job" : isPending ? "Accepting..." : "Accept"}
          </button>
        </div>
      </article>
    </div>
  );
}
