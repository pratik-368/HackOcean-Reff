import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative bg-[var(--abyss)] pt-32 pb-12 overflow-hidden">
      
      {/* Seabed gradient texture at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--ocean)]/20 to-transparent pointer-events-none" />

      {/* Coral-branch SVG Background (Silhouettes) */}
      <div className="absolute inset-0 coral-branch-bg opacity-20 pointer-events-none mix-blend-screen animate-current-drift filter invert" />

      {/* Bioluminescent dots */}
      <div className="absolute bottom-10 left-[10%] w-2 h-2 rounded-full bg-[var(--surface-blue)] opacity-60 shadow-[0_0_10px_var(--surface-blue)] animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 left-[30%] w-1.5 h-1.5 rounded-full bg-[var(--surface-blue)] opacity-50 shadow-[0_0_8px_var(--surface-blue)] animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute bottom-12 right-[20%] w-2.5 h-2.5 rounded-full bg-[var(--sunlight)] opacity-60 shadow-[0_0_12px_var(--sunlight)] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      <div className="absolute bottom-32 right-[40%] w-1 h-1 rounded-full bg-[var(--surface-blue)] opacity-50 shadow-[0_0_5px_var(--surface-blue)] animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-heading mb-4 text-[var(--foam)]">REEF.</h2>
            <p className="text-[var(--foam)]/70 max-w-sm mb-6 font-normal">
              The Ocean That Remembers. Dedicated to protecting coral reefs and marine biodiversity globally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--foam)]/5 border border-[var(--surface-blue)]/30 flex items-center justify-center text-[var(--foam)] hover:text-[var(--abyss)] hover:bg-[var(--sunlight)] hover:border-transparent hover:scale-110 transition-all duration-300 shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--foam)]/5 border border-[var(--surface-blue)]/30 flex items-center justify-center text-[var(--foam)] hover:text-[var(--abyss)] hover:bg-[var(--sunlight)] hover:border-transparent hover:scale-110 transition-all duration-300 shadow-sm">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--foam)]/5 border border-[var(--surface-blue)]/30 flex items-center justify-center text-[var(--foam)] hover:text-[var(--abyss)] hover:bg-[var(--sunlight)] hover:border-transparent hover:scale-110 transition-all duration-300 shadow-sm">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-[var(--foam)] font-heading">Explore</h4>
            <ul className="space-y-4 text-[var(--foam)]/70">
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors inline-block link-flow pb-0.5">Mission</a></li>
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors inline-block link-flow pb-0.5">The Crisis</a></li>
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors inline-block link-flow pb-0.5">Impact</a></li>
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors inline-block link-flow pb-0.5">Global Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-[var(--foam)] font-heading">Take Action</h4>
            <ul className="space-y-4 text-[var(--foam)]/70">
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors font-medium inline-block link-flow pb-0.5">Donate</a></li>
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors font-medium inline-block link-flow pb-0.5">Volunteer</a></li>
              <li><a href="#" className="hover:text-[var(--sunlight)] transition-colors font-medium inline-block link-flow pb-0.5">Partner</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--foam)]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--foam)]/50 font-medium">
          <p>© {new Date().getFullYear()} REEF. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--sunlight)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--sunlight)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
