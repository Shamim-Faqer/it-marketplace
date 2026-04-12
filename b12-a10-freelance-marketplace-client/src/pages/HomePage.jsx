import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

const categories = [
  {
    title: "Web Development",
    count: "120+ Jobs",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Graphics Design",
    count: "85+ Jobs",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Digital Marketing",
    count: "95+ Jobs",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomePage() {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["latest-jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs/latest?limit=6");
      return res.data;
    },
  });

  return (
    <div className="bg-base-200 min-h-screen overflow-x-hidden">
      {/* --- Hero Section --- */}
      <section className="relative bg-primary text-primary-content py-16 lg:py-28 px-4 overflow-hidden">
        {/* Background Accent - Optional Decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Reliable freelancing starts with <span className="text-secondary">trusted opportunities.</span>
            </h1>
            <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Freelance MarketPlace helps clients post quality jobs and helps freelancers accept meaningful tasks confidently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/allJobs" className="btn btn-secondary btn-md md:btn-lg shadow-xl px-10 font-bold">
                Explore Jobs
              </Link>
              <Link to="/addJob" className="btn btn-outline btn-md md:btn-lg text-white border-white hover:bg-white hover:text-primary px-10 font-bold">
                Create a Job
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="hidden lg:block relative"
          >
             <div className="relative z-10 w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Workplace" className="w-full h-full object-cover" />
             </div>
             {/* Decorative Box */}
             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-2xl -z-0 opacity-50 blur-sm"></div>
          </motion.div>
        </div>
      </section>

      {/* --- Latest Jobs Section --- */}
      <section className="max-w-7xl mx-auto py-16 md:py-24 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight uppercase">Latest Jobs</h2>
            <div className="h-1.5 w-20 bg-primary mt-2 mx-auto sm:mx-0 rounded-full"></div>
          </div>
          <Link to="/allJobs" className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10">
            View All Openings →
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {jobs.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* --- Top Categories Section --- */}
      <section className="bg-base-100 py-16 md:py-24 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase">Browse by Category</h2>
             <p className="text-base-content/60 max-w-lg mx-auto italic">Explore specialized opportunities tailored to your skills</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item) => (
              <motion.article 
                key={item.title} 
                whileHover={{ y: -8 }}
                className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <span className="inline-block px-3 py-1 bg-secondary text-secondary-content text-xs font-black rounded-lg w-max uppercase tracking-tighter">
                    {item.count}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <div className="card bg-primary text-primary-content shadow-2xl image-full before:!bg-opacity-75 before:!bg-primary overflow-hidden rounded-[2rem]">
          <figure>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="About IT Workly" className="w-full" />
          </figure>
          <div className="card-body items-center text-center py-16 md:py-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">About IT Workly</h2>
            <p className="text-lg md:text-xl max-w-3xl opacity-90 leading-relaxed font-medium">
              We focus on transparent freelance matching, secure communication, and a simple task lifecycle from job posting to completion. Our mission is to bridge the gap between world-class talent and high-impact opportunities.
            </p>
            <div className="card-actions mt-10">
              <button className="btn btn-secondary btn-wide btn-lg font-black shadow-lg hover:scale-105 transition-transform uppercase">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
