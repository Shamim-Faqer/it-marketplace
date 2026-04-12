import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";

export default function AddJobPage() {
  const { user } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.post("/jobs", payload),
    onSuccess: (data) => {
      toast.success("New job added successfully.");
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to add job."),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      title: form.title.value.trim(),
      postedBy: user?.displayName || "Anonymous",
      category: form.category.value,
      summary: form.summary.value.trim(),
      coverImage: form.coverImage.value.trim(),
      userEmail: user?.email,
    };
    
    mutate(payload, {
      onSuccess: () => form.reset(), // শুধুমাত্র সফল হলেই ফর্ম রিসেট হবে
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100 border border-primary/10">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-primary mb-6 justify-center">
            Add a New Job
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Job Title</label>
              <input 
                name="title" 
                type="text" 
                placeholder="Enter job title" 
                className="input input-bordered focus:input-primary transition-all" 
                required 
              />
            </div>

            {/* User Name (Read Only) */}
            <div className="form-control">
              <label className="label font-semibold">Posted By</label>
              <input 
                value={user?.displayName || ""} 
                readOnly 
                className="input input-bordered bg-base-200 cursor-not-allowed opacity-70" 
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label font-semibold">Category</label>
              <select 
                name="category" 
                className="select select-bordered focus:select-primary transition-all" 
                required
              >
                <option value="" disabled selected>Select Category</option>
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Graphics Designing</option>
                <option>Content Writing</option>
                <option>Video Editing</option>
              </select>
            </div>

            {/* Cover Image URL */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Cover Image URL</label>
              <input 
                name="coverImage" 
                type="url" 
                placeholder="https://example.com/image.jpg" 
                className="input input-bordered focus:input-primary transition-all" 
              />
            </div>

            {/* User Email (Read Only) */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Contact Email</label>
              <input 
                value={user?.email || ""} 
                readOnly 
                className="input input-bordered bg-base-200 cursor-not-allowed opacity-70" 
              />
            </div>

            {/* Job Summary */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Job Summary</label>
              <textarea 
                name="summary" 
                className="textarea textarea-bordered h-32 focus:textarea-primary transition-all" 
                placeholder="Describe the job requirements and responsibilities..." 
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control md:col-span-2 mt-6">
              <button 
                className={`btn btn-primary text-white font-bold text-lg ${isPending ? 'loading' : ''}`} 
                disabled={isPending}
              >
                {isPending ? "Posting Job..." : "Post This Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
