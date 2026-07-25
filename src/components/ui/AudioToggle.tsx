import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ambient relaxing music: "Fluidscape" by Kevin MacLeod (incompetech.com)
    const audio = new Audio('https://incompetech.com/music/royalty-free/mp3-royaltyfree/Fluidscape.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Very quiet
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Browsers might block this if not triggered by user interaction
      // But since it's triggered by a click, it should be fine.
      audioRef.current.play().catch(e => console.log('Audio playback failed', e));
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggleAudio}
      className="fixed bottom-6 left-6 z-[90] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-[var(--surface-blue)]/30 flex items-center justify-center text-[var(--deep-blue)] shadow-lg hover:bg-[var(--surface-blue)] hover:text-white hover:border-transparent transition-all duration-300 group"
      aria-label="Toggle ambient ocean sound"
    >
      {isPlaying ? (
        <Volume2 size={20} />
      ) : (
        <VolumeX size={20} className="opacity-60 group-hover:opacity-100" />
      )}
      
      {/* Tooltip */}
      <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-[var(--deep-blue)] text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      </span>
    </motion.button>
  );
};
