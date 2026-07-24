import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative bg-[var(--ocean-deep)] pt-24 pb-12 overflow-hidden">
      {/* Coral-branch SVG Background at 5-8% opacity */}
      <div className="absolute inset-0 coral-branch-bg opacity-40 pointer-events-none" />

      {/* Organic blob shape */}
      <div className="absolute bottom-0 right-0 opacity-[0.04] pointer-events-none w-[400px] h-[400px] translate-x-1/4 translate-y-1/4">
        <div className="w-full h-full bg-[var(--coral)] blob-shape" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-heading mb-4 text-[var(--sand)]">REEF.</h2>
            <p className="text-[var(--sand)]/60 max-w-sm mb-6">
              The Ocean That Remembers. Dedicated to protecting coral reefs and marine biodiversity globally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--sand)]/5 border border-[var(--seafoam)]/20 flex items-center justify-center text-[var(--sand)] hover:text-[var(--coral)] hover:scale-110 transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--sand)]/5 border border-[var(--seafoam)]/20 flex items-center justify-center text-[var(--sand)] hover:text-[var(--coral)] hover:scale-110 transition-all duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--sand)]/5 border border-[var(--seafoam)]/20 flex items-center justify-center text-[var(--sand)] hover:text-[var(--coral)] hover:scale-110 transition-all duration-300">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-[var(--sand)] font-heading">Explore</h4>
            <ul className="space-y-3 text-[var(--sand)]/60">
              <li><a href="#" className="hover:text-[var(--seafoam)] transition-colors">Mission</a></li>
              <li><a href="#" className="hover:text-[var(--seafoam)] transition-colors">The Crisis</a></li>
              <li><a href="#" className="hover:text-[var(--seafoam)] transition-colors">Impact</a></li>
              <li><a href="#" className="hover:text-[var(--seafoam)] transition-colors">Global Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-[var(--sand)] font-heading">Take Action</h4>
            <ul className="space-y-3 text-[var(--sand)]/60">
              <li><a href="#" className="hover:text-[var(--coral)] transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-[var(--coral)] transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-[var(--coral)] transition-colors">Partner</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--sand)]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--sand)]/40">
          <p>© {new Date().getFullYear()} REEF. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--sand)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--sand)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
