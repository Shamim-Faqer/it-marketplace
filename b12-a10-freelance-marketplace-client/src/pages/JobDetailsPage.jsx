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

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>;
  if (!job) return <div className="text-center py-20 font-bold text-error">Job not found.</div>;

  const isOwnJob = job.userEmail === user?.email;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <article className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden border border-base-300">
          {/* Left Side: Image */}
          <figure className="lg:w-1/2">
            <img 
              className="w-full h-full object-cover min-h-[300px]" 
              src={job.coverImage || "https://via.placeholder.com/600x400?text=No+Image+Available"} 
              alt={job.title} 
            />
          </figure>

          {/* Right Side: Content */}
          <div className="card-body lg:w-1/2 p-6 md:p-10">
            <div className="flex justify-between items-start mb-4">
              <span className="badge badge-primary badge-outline font-bold px-4 py-3 uppercase tracking-wider text-xs">
                {job.category}
              </span>
              <div className="badge badge-ghost text-[10px] uppercase font-bold opacity-60">Job ID: {id.slice(-6)}</div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-base-content leading-tight mb-2 uppercase">
              {job.title}
            </h2>
            
            <div className="flex items-center gap-3 mb-6">
               <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-8">
                    <span className="text-xs">{job.postedBy?.charAt(0)}</span>
                  </div>
               </div>
               <p className="text-sm font-semibold text-base-content/70 italic">
                 Posted by <span className="text-primary not-italic">@{job.postedBy}</span>
               </p>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
               <h3 className="font-bold text-lg text-primary uppercase tracking-tighter">Description</h3>
               <p className="text-base-content/80 leading-relaxed text-justify">
                 {job.summary}
               </p>
            </div>

            <div className="card-actions mt-10">
              <button 
                className={`btn btn-block md:btn-lg font-black uppercase shadow-lg transition-all duration-300 ${
                  isOwnJob ? "btn-disabled bg-base-300" : "btn-primary hover:scale-[1.02]"
                }`} 
                disabled={isOwnJob || isPending} 
                onClick={() => acceptJob()}
              >
                {isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : isOwnJob ? (
                  "Own Job Post"
                ) : (
                  "Accept This Job"
                )}
              </button>
              
              {isOwnJob && (
                <p className="text-error text-xs font-bold w-full text-center mt-2 italic">
                  * You cannot accept a task that you posted yourself.
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
