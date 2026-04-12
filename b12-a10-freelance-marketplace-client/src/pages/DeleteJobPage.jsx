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
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-error/20 overflow-hidden">
        {/* Top Danger Bar */}
        <div className="h-2 bg-error w-full"></div>
        
        <div className="card-body items-center text-center p-8">
          {/* Warning Icon (SVG - No Dependency) */}
          <div className="p-4 bg-error/10 rounded-full mb-4 ring-8 ring-error/5">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-error" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>

          <h2 className="card-title text-2xl font-black text-base-content uppercase tracking-tight">
            Delete Job?
          </h2>
          
          <p className="text-base-content/70 text-sm leading-relaxed mt-2">
            Are you sure you want to remove this post? This action is permanent and cannot be reversed.
          </p>
          
          {/* Assignment Tag */}
          <div className="mt-4 px-3 py-1 bg-base-200 rounded-full text-[10px] uppercase font-bold text-base-content/40 tracking-widest border border-base-300">
             Internal Route: Assignment Requirement
          </div>

          <div className="card-actions justify-center gap-3 mt-10 w-full">
            {/* Cancel Button */}
            <button 
              type="button"
              className="btn btn-ghost flex-1 hover:bg-base-300 transition-colors font-bold" 
              onClick={() => navigate(-1)}
              disabled={isPending}
            >
              Go Back
            </button>

            {/* Confirm Delete Button */}
            <button 
              className={`btn btn-error text-white flex-1 shadow-lg shadow-error/20 font-bold ${isPending ? 'loading' : ''}`} 
              onClick={() => mutate()} 
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
