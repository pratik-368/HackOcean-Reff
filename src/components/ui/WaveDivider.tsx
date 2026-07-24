export const WaveDivider = ({ 
  topColor = "var(--foam)", 
  bottomColor = "rgba(30,96,145,0.08)" 
}: { 
  topColor?: string;
  bottomColor?: string;
}) => {
  return (
    <div className="relative w-full h-[120px] md:h-[180px] overflow-hidden flex flex-col justify-end pointer-events-none" style={{ backgroundColor: topColor }}>
      <svg 
        viewBox="0 0 2880 120" 
        preserveAspectRatio="none" 
        className="w-[200%] h-full animate-wave-drift absolute bottom-0 left-0"
      >
        <path
          d="M0,60 C480,120 960,0 1440,60 C1920,120 2400,0 2880,60 L2880,120 L0,120 Z"
          fill={bottomColor}
        />
        <path
          d="M0,80 C720,20 1440,100 2160,40 C2520,20 2760,50 2880,80 L2880,120 L0,120 Z"
          fill={bottomColor}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
