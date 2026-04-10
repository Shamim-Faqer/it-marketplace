import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <article className="card">
      <img src={job.coverImage} alt={job.title} className="job-image" />
      <div className="card-body">
        <p className="chip">{job.category}</p>
        <h3>{job.title}</h3>
        <p className="muted">Posted by: {job.postedBy}</p>
        <p className="summary">{job.summary}</p>
        <Link className="btn" to={`/allJobs/${job._id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
