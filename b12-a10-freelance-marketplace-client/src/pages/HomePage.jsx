import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

// ক্যাটাগরি ডাটা
const categories = [
  {
    title: "Web Development",
    count: "120+ Jobs",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Graphics Design",
    count: "85+ Jobs",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Digital Marketing",
    count: "95+ Jobs",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Video & Animation",
    count: "70+ Jobs",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Content Creation",
    count: "60+ Jobs",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Local Business & SEO",
    count: "50+ Jobs",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=900&q=80",
  },
];

// পার্টনার লোগো ডাটা
const partners = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
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
      <section className="relative glass bg-primary text-primary-content py-16 lg:py-28 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Reliable freelancing starts with <span className="text-primary-content underline decoration-white/30">trusted opportunities.</span>
            </h1>
            <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Freelance MarketPlace helps clients post quality jobs and helps freelancers accept meaningful tasks confidently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/allJobs" className="btn btn-primary-content text-primary btn-md md:btn-lg shadow-xl px-10 font-bold border-none">
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
             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-content rounded-2xl -z-0 opacity-50 blur-sm"></div>
          </motion.div>
        </div>
      </section>

      {/* --- Latest Jobs Section --- */}
      <section className="max-w-7xl bg-primary-content mx-auto py-16 md:py-24 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight uppercase">Latest Jobs</h2>
            <div className="h-1.5 w-20 bg-primary mt-2 mx-auto sm:mx-0 rounded-full"></div>
          </div>
          <Link to="/allJobs" className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10 transition-all">
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
      <section className="bg-primary-content py-16 md:py-24 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase">Browse by Category</h2>
             <p className="text-base-content max-w-lg mx-auto italic">Explore specialized opportunities tailored to your skills</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <motion.article 
                key={item.title} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-content transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-3">
                        <span className="inline-block px-4 py-1.5 bg-primary-content text-primary text-xs font-black rounded-full uppercase tracking-wider shadow-lg">
                          {item.count}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                           </svg>
                        </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Partners Section --- */}
      <section className="bg-primary-content glass py-16 border-y ">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-5xl font-bold tracking-[0.3em] text-primary mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-50 hover:grayscale-0 transition-all duration-700">
            {partners.map((partner, idx) => (
              <motion.img
                key={idx}
                src={partner.logo}
                alt={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-6 md:h-8 object-contain hover:scale-110 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section className="max-w-6xl bg-primary-content mx-auto py-20 px-4">
        <div className="card glass text-primary-content shadow-2xl image-full  overflow-hidden rounded-xl">
          <figure>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="About IT Workly" className="w-full glass h-full object-cover" />
          </figure>
          <div className="card-body items-center text-center py-16 md:py-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-primary bg-primary-content rounded-2xl p-2">About IT Workly</h2>
            <p className="text-lg md:text-xl max-w-3xl opacity-90 leading-relaxed font-medium">
              We focus on transparent freelance matching, secure communication, and a simple task lifecycle from job posting to completion. Our mission is to bridge the gap between world-class talent and high-impact opportunities.
            </p>
            <div className="card-actions mt-10">
              <button className="btn btn-primary-content text-primary border-none btn-wide btn-lg font-black shadow-lg hover:scale-105 hover:bg-white transition-all uppercase">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
