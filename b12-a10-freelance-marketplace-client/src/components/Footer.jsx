export default function Footer() {
  return (
    <footer className="bg-primary glass text-white font-bold py-10 px-4 mt-20 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Brand Info */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
            IT Workly
          </h2>
          <p className="text-xs font-medium opacity-60 max-w-xs mx-auto md:mx-0 leading-relaxed">
            Connecting world-class talent with high-impact opportunities. Reliable freelancing starts here.
          </p>
        </div>

        {/* Copyright Section */}
        <div className="text-sm font-semibold opacity-80 order-3 md:order-2">
          <p>© {new Date().getFullYear()} <span className="text-secondary">Freelance MarketPlace</span></p>
          <p className="text-[10px] mt-1 opacity-50 uppercase tracking-widest">All rights reserved.</p>
        </div>

        {/* Social Link */}
        <div className="flex justify-center md:justify-end order-2 md:order-3">
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 group shadow-lg"
          >
            <svg 
              className="w-5 h-5 fill-current transition-transform group-hover:scale-110" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.25l-4.9-6.42L6.3 22H3.2l7.25-8.28L.8 2h6.4l4.43 5.84L18.9 2zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20z" />
            </svg>
            <span className="text-sm font-black uppercase tracking-tight">Follow on X</span>
          </a>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8"></div>
    </footer>
  );
}
