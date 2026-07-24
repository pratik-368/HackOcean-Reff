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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo — Fraunces */}
        <a
          href="#"
          className="font-heading text-3xl font-bold tracking-tight text-[var(--ocean-deep)]"
        >
          REEF.
        </a>

        {/* Center Links */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`text-sm font-medium transition-colors relative group text-[var(--ocean-deep)] hover:text-[var(--coral)]`}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--coral)] transition-all duration-300 group-hover:w-full" />
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
