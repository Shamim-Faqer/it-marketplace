import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function MyAddedJobsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["my-jobs", user?.email],
    queryFn: async () => {
      const res = await api.get(`/my-jobs?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: deleteJob, isPending } = useMutation({
    mutationFn: (id) => api.delete(`/jobs/${id}?email=${user.email}`),
    onSuccess: () => {
      toast.success("Job deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-jobs", user.email] });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Delete failed."),
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 bg-base-100 p-8 rounded-[2rem] shadow-sm border border-base-300">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">My Posted Jobs</h2>
            <p className="text-base-content/60 font-medium mt-1">Manage and track the opportunities you've created</p>
          </div>
          <Link to="/addJob" className="btn btn-primary px-8 font-black uppercase shadow-lg shadow-primary/20">
            Post New Job
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <article 
                key={job._id} 
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 overflow-hidden rounded-[2.5rem]"
              >
                {/* Image Section */}
                <figure className="h-52 relative">
                  <img className="w-full h-full object-cover" src={job.coverImage} alt={job.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                     <span className="badge badge-secondary font-black uppercase text-[10px] py-3 px-4 shadow-xl">
                       {job.category}
                     </span>
                  </div>
                </figure>

                <div className="card-body p-8">
                  <h3 className="card-title text-xl font-black uppercase leading-tight mb-3 line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-base-content/70 leading-relaxed line-clamp-2 mb-6 font-medium italic">
                    {job.summary}
                  </p>
                  
                  <div className="divider opacity-50 my-0"></div>
                  
                  <div className="card-actions grid grid-cols-2 gap-4 mt-6">
                    {/* Update Link */}
                    <Link 
                      to={`/updateJob/${job._id}`} 
                      className="btn btn-outline btn-primary font-black uppercase text-xs hover:!text-white shadow-sm"
                    >
                      Edit Post
                    </Link>
                    
                    {/* Delete Button */}
                    <button 
                      className={`btn btn-error btn-ghost bg-error/10 hover:bg-error hover:text-white font-black uppercase text-xs transition-all ${isPending ? 'loading' : ''}`} 
                      onClick={() => deleteJob(job._id)}
                      disabled={isPending}
                    >
                      {isPending ? "..." : "Remove"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State for Professional Look */
          <div className="text-center py-24 bg-base-100 rounded-[3rem] shadow-inner border-2 border-dashed border-base-300">
            <h3 className="text-2xl font-black text-base-content/30 uppercase tracking-widest mb-4">You haven't posted any jobs</h3>
            <Link to="/addJob" className="btn btn-primary btn-wide font-black uppercase">Create Your First Post</Link>
          </div>
        )}
      </div>
    </div>
  );
}
