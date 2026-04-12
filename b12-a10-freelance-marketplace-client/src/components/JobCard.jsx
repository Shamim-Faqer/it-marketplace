import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <article className="group bg-base-100 rounded-[2rem] overflow-hidden border border-base-300 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Section with Overlay */}
      <figure className="relative h-56 overflow-hidden">
        <img 
          src={job.coverImage || "https://via.placeholder.com/400x300?text=Job+Image"} 
          alt={job.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge - Changed from badge-secondary to custom primary-content colors */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-primary-content text-primary font-black uppercase text-[10px] py-2 px-4 rounded-full shadow-lg tracking-widest border-none">
            {job.category}
          </span>
        </div>
      </figure>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-black text-base-content leading-tight mb-2 uppercase line-clamp-1 group-hover:text-primary transition-colors">
          {job.title}
        </h3>

        {/* Posted By Info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-[11px] font-bold text-base-content/50 uppercase tracking-tighter italic">
            By <span className="text-base-content/80 not-italic">{job.postedBy}</span>
          </p>
        </div>

        {/* Summary with line clamp */}
        <p className="text-sm text-base-content/70 leading-relaxed mb-6 line-clamp-3 font-medium">
          {job.summary}
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          <Link 
            className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group-hover:gap-4" 
            to={`/allJobs/${job._id}`}
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
