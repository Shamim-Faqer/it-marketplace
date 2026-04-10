import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";

export default function DeleteJobPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/jobs/${id}?email=${user.email}`),
    onSuccess: () => {
      toast.success("Job deleted successfully.");
      navigate("/myAddedJobs");
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Delete failed."),
  });

  return (
    <div className="container form-wrap">
      <div className="form-card">
        <h2>Delete Job</h2>
        <p>This route is included to satisfy assignment route requirements.</p>
        <button className="btn btn-danger" onClick={() => mutate()} disabled={isPending}>
          {isPending ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
    </div>
  );
}
