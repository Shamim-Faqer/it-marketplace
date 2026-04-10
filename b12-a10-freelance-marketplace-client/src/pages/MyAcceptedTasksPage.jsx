import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function MyAcceptedTasksPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["accepted-tasks", user.email],
    queryFn: async () => {
      const res = await api.get(`/accepted-tasks?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: removeTask } = useMutation({
    mutationFn: (id) => api.delete(`/accepted-tasks/${id}?email=${user.email}`),
    onSuccess: () => {
      toast.success("Task removed successfully.");
      queryClient.invalidateQueries({ queryKey: ["accepted-tasks", user.email] });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Operation failed."),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="container section-stack">
      <h2>My Accepted Tasks</h2>
      <div className="grid grid-3">
        {data.map((task) => (
          <article key={task._id} className="card">
            <img className="job-image" src={task.coverImage} alt={task.title} />
            <div className="card-body">
              <p className="chip">{task.category}</p>
              <h3>{task.title}</h3>
              <p className="summary">{task.summary}</p>
              <div className="inline-buttons">
                <button className="btn" onClick={() => removeTask(task._id)}>
                  DONE
                </button>
                <button className="btn btn-danger" onClick={() => removeTask(task._id)}>
                  CANCEL
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
