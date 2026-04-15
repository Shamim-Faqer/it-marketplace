export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      link: "https://facebook.com",
      color: "hover:bg-[#1877F2]",
      icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    },
    {
      name: "Instagram",
      link: "https://instagram.com",
      color: "hover:bg-[#E4405F]",
      icon: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </>
      )
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/yournumber",
      color: "hover:bg-[#25D366]",
      icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
    },
    {
      name: "Pinterest",
      link: "https://pinterest.com",
      color: "hover:bg-[#BD081C]",
      icon: <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m0 0v8"></path> // Simplified Pinterest style
    },
    {
      name: "Snapchat",
      link: "https://snapchat.com",
      color: "hover:bg-[#FFFC00] hover:text-black",
      icon: <path d="M12 3c-4.42 0-8 3.58-8 8 0 1.61.47 3.1 1.28 4.36L4 21l5.64-1.28A7.93 7.93 0 0 0 12 19c4.42 0 8-3.58 8-8s-3.58-8-8-8z"></path>
    },
    {
      name: "X",
      link: "https://x.com",
      color: "hover:bg-black",
      icon: <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.25l-4.9-6.42L6.3 22H3.2l7.25-8.28L.8 2h6.4l4.43 5.84L18.9 2zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20z" />
    }
  ];

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
          <p>© {new Date().getFullYear()} <span className="text-secondary">It Workly</span></p>
          <p className="text-[10px] mt-1 opacity-50 uppercase tracking-widest">All rights reserved.</p>
        </div>

        {/* Social Links Container */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 order-2 md:order-3">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.link} 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center justify-center w-10 h-10 md:w-auto md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full transition-all duration-300 group shadow-lg ${social.color}`}
              title={social.name}
            >
              <svg 
                className="w-5 h-5 fill-none stroke-current stroke-2 transition-transform group-hover:scale-110" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {social.icon}
              </svg>
              <span className="hidden md:block ml-2 text-[10px] font-black uppercase tracking-tight">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8"></div>
    </footer>
  );
}
