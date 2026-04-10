import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import JobCard from "../components/JobCard";

const categories = [
  {
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Graphics Design",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomePage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["latest-jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs/latest?limit=6");
      return res.data;
    },
  });

  return (
    <div className="container section-stack">
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
          <h1>Reliable freelancing starts with trusted opportunities.</h1>
          <p>
            Freelance MarketPlace helps clients post quality jobs and helps freelancers accept meaningful tasks
            confidently.
          </p>
          <div className="hero-actions">
            <Link to="/allJobs" className="btn btn-soft">
              Explore Jobs
            </Link>
            <Link to="/addJob" className="btn">
              Create a Job
            </Link>
          </div>
        </motion.div>
      </section>

      <section>
        <div className="section-head">
          <h2>Latest Jobs</h2>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-3">
            {data.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <h2>Top Categories</h2>
        </div>
        <div className="grid grid-3">
          {categories.map((item) => (
            <article key={item.title} className="category-card">
              <img src={item.image} alt={item.title} className="job-image" />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="about-card">
        <div className="section-head">
          <h2>About Freelance MarketPlace</h2>
        </div>
        <p>
          We focus on transparent freelance matching, secure communication, and a simple task lifecycle from job
          posting to completion.
        </p>
      </section>
    </div>
  );
}
