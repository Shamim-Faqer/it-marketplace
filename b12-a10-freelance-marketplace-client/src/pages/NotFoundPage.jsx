import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Text */}
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-9xl font-black text-primary opacity-20 select-none"
        >
          404
        </motion.h1>

        {/* Content Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-base-100 p-10 rounded-[2.5rem] shadow-2xl border border-base-300 -mt-16 relative z-10"
        >
          <div className="mb-6">
            <div className="bg-error/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-base-content uppercase tracking-tighter">Lost in Space?</h2>
            <p className="text-base-content/60 mt-3 font-medium leading-relaxed italic">
              The route you visited does not exist or has been moved.
            </p>
          </div>

          <div className="divider opacity-50"></div>

          <Link 
            to="/" 
            className="btn btn-primary btn-block btn-lg font-black uppercase shadow-lg shadow-primary/20 tracking-wider group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
