import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

export default function AllJobsPage() {
  const [sort, setSort] = useState("desc");

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["all-jobs", sort],
    queryFn: async () => {
      const res = await api.get(`/jobs?sort=${sort}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-primary-content py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header & Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-primary-content p-6 rounded-2xl shadow-sm border border-base-300">
          <div>
            <h2 className="text-3xl font-extrabold text-primary">Explore Jobs</h2>
            <p className="text-base-content/70 mt-1">Find your next career opportunity</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-medium text-base-content/60">Sort By:</span>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)} 
              className="select select-bordered select-primary w-full md:w-auto focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="desc">Latest Posted</option>
              <option value="asc">Oldest Posted</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-base-100 rounded-2xl shadow-inner border border-dashed border-base-300">
            <h3 className="text-xl font-semibold text-base-content/50">No jobs found at the moment.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
