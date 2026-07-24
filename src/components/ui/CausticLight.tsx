export const CausticLight = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden mix-blend-overlay">
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] animate-gradient opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, var(--surface-blue) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, var(--surface-blue) 0%, transparent 30%),
            radial-gradient(circle at 20% 80%, var(--surface-blue) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--surface-blue) 0%, transparent 40%)
          `,
          backgroundSize: '100% 100%',
          filter: 'url(#water)',
        }}
      />
      
      {/* SVG Filter for organic water distortion */}
      <svg className="hidden">
        <defs>
          <filter id="water">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
