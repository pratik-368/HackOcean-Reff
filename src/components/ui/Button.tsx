import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Magnetic from './Magnetic';
import { ArrowRight } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, showArrow = false, ...props }, ref) => {
    
    const variants = {
      primary:
        'bg-[var(--sunlight)] text-[var(--abyss)] ' +
        'shadow-[0_4px_14px_rgba(255,184,107,0.3)] ' +
        'hover:shadow-[0_0_24px_rgba(255,184,107,0.5)] ' +
        'hover:brightness-110 font-bold',
      secondary:
        'border-2 border-[var(--deep-blue)] text-[var(--deep-blue)] bg-transparent ' +
        'hover:bg-[var(--surface-blue)]/10',
      outline:
        'border-2 border-[var(--deep-blue)] text-[var(--deep-blue)] bg-transparent ' +
        'hover:bg-[var(--surface-blue)]/10',
      ghost:
        'text-[var(--deep-blue)] bg-transparent ' +
        'hover:bg-[var(--deep-blue)]/5',
    };

    const sizes = {
      sm: 'px-6 py-2.5 text-sm',
      md: 'px-8 py-3.5 text-base',
      lg: 'px-10 py-5 text-lg',
    };

    return (
      <Magnetic>
        <motion.button
          ref={ref}
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          className={cn(
            'group rounded-full transition-all duration-400 flex items-center justify-center gap-2 relative overflow-hidden font-medium cursor-pointer',
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        >
          <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          
          <span className="relative z-10 flex items-center gap-2">
            {children}
            {showArrow && (
              <motion.span
                variants={{
                  hover: { x: 5, opacity: 1 },
                  initial: { x: 0, opacity: 0.7 }
                }}
                transition={{ duration: 0.3 }}
                className="inline-flex"
              >
                <ArrowRight size={18} />
              </motion.span>
            )}
          </span>
        </motion.button>
      </Magnetic>
    );
  }
);

Button.displayName = 'Button';
