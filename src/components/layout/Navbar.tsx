import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Mission', 'The Crisis', 'Impact', 'Stories'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
        scrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'
      }`}
    >
      {/* Subtle light refraction shimmer sweep on scroll */}
      {scrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[200%] h-full pointer-events-none opacity-50 -skew-x-12 animate-[wave-drift_6s_ease-in-out_infinite_alternate]" />
      )}

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative z-10">
        {/* Logo — Fraunces */}
        <a
          href="#"
          className="font-heading text-3xl font-bold tracking-tight text-white"
        >
          REEF.
        </a>

        {/* Center Links */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-semibold transition-colors text-white hover:text-[var(--sunlight)] link-flow pb-1"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm" className="hidden md:flex font-semibold">
            Donate
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
