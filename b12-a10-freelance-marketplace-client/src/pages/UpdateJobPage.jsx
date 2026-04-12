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

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>;
  if (!job) return <div className="text-center py-20 font-bold text-error uppercase italic">Job not found.</div>;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-base-300 overflow-hidden rounded-[2.5rem]">
        
        {/* Header Section */}
        <div className="bg-primary p-8 text-primary-content text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Update Job Post</h2>
          <p className="text-sm opacity-80 mt-2 font-medium italic">Modify the details to keep your posting accurate</p>
        </div>

        <form className="card-body p-8 md:p-12 space-y-6" onSubmit={handleSubmit}>
          
          {/* Job Title */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/60">Job Title</span>
            </label>
            <input 
              name="title" 
              defaultValue={job.title} 
              className="input input-bordered focus:input-primary transition-all font-bold" 
              placeholder="e.g. MERN Stack Developer Needed"
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Select */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/60">Select Category</span>
              </label>
              <select 
                className="select select-bordered focus:select-primary transition-all font-bold" 
                name="category" 
                defaultValue={job.category} 
                required
              >
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Graphics Designing</option>
                <option>Content Writing</option>
                <option>Video Editing</option>
              </select>
            </div>

            {/* Cover Image URL */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/60">Cover Image URL</span>
              </label>
              <input 
                name="coverImage" 
                defaultValue={job.coverImage} 
                className="input input-bordered focus:input-primary transition-all font-medium text-xs" 
                placeholder="https://images.com/example.jpg"
                required 
              />
            </div>
          </div>

          {/* Job Summary */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-black uppercase text-[10px] tracking-widest text-base-content/60">Job Summary</span>
            </label>
            <textarea 
              className="textarea textarea-bordered focus:textarea-primary h-32 transition-all font-medium leading-relaxed" 
              name="summary" 
              defaultValue={job.summary} 
              placeholder="Describe the job requirements and responsibilities..."
              required 
            />
          </div>

          {/* Action Buttons */}
          <div className="card-actions grid grid-cols-2 gap-4 mt-8">
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="btn btn-outline border-base-300 font-black uppercase tracking-tight"
            >
              Cancel
            </button>
            <button 
              className={`btn btn-primary font-black uppercase shadow-lg shadow-primary/20 tracking-tight ${isPending ? 'loading' : ''}`} 
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
