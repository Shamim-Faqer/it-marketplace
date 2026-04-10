import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

export default function AllJobsPage() {
  const [sort, setSort] = useState("desc");

  const { data = [], isLoading } = useQuery({
    queryKey: ["all-jobs", sort],
    queryFn: async () => {
      const res = await api.get(`/jobs?sort=${sort}`);
      return res.data;
    },
  });

  return (
    <div className="container section-stack">
      <div className="page-head">
        <h2>All Jobs</h2>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input">
          <option value="desc">Sort by latest posted</option>
          <option value="asc">Sort by oldest posted</option>
        </select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-3">
          {data.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
