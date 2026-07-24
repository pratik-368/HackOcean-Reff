import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, Activity } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';

const projects = [
  {
    id: 1,
    name: 'Great Barrier Reef Restoration',
    lat: -18.2871,
    lng: 147.6992,
    health: 'Critical',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Florida Keys Nursery',
    lat: 25.0343,
    lng: -80.5255,
    health: 'Recovering',
    progress: 72,
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    name: 'Raja Ampat Protection Zone',
    lat: -0.2333,
    lng: 130.5167,
    health: 'Stable',
    progress: 90,
    image: 'https://images.unsplash.com/photo-1620921575225-780c10972b22?auto=format&fit=crop&q=80&w=400',
  }
];

// Custom animated marker
const createCustomIcon = (health: string) => {
  const colorClass = health === 'Critical' ? 'bg-[var(--coral)]' : health === 'Recovering' ? 'bg-[var(--coral-light)]' : 'bg-[var(--seafoam)]';
  
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer">
        <div class="absolute inset-0 rounded-full ${colorClass} opacity-30 group-hover:opacity-60 group-hover:scale-150 transition-all duration-500 animate-ping"></div>
        <div class="relative w-4 h-4 rounded-full ${colorClass} shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-[var(--ocean-deep)] group-hover:scale-125 transition-transform duration-300"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export const GlobalMap = () => {
  return (
    <section id="global-map" className="py-32 bg-[var(--ocean-deep)] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[var(--ocean-deep)]/40 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 mb-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading mb-6 text-[var(--sand)] tracking-tight">Global Impact</h2>
            <p className="text-xl text-[var(--sand)]/70 font-light leading-relaxed">
              Explore our active restoration sites and protection zones across the world's oceans. Every marker represents a restored future.
            </p>
          </div>
          
          <div className="flex gap-6 p-4 rounded-full glass-dark shrink-0">
            <div className="flex items-center gap-3 text-sm text-[var(--sand)]/90 tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral)] shadow-[0_0_10px_var(--coral)]"></span> Critical
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--sand)]/90 tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral-light)] shadow-[0_0_10px_var(--coral-light)]"></span> Recovering
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--sand)]/90 tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--seafoam)] shadow-[0_0_10px_var(--seafoam)]"></span> Stable
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full h-[700px] relative px-6 md:px-12">
        <div 
          className="w-full h-full relative z-10 organic-mask"
          style={{
            maskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><path d=\"M5.5,50 C5.5,25.42 25.42,5.5 50,5.5 C74.58,5.5 94.5,25.42 94.5,50 C94.5,74.58 74.58,94.5 50,94.5 C25.42,94.5 5.5,74.58 5.5,50 Z\" fill=\"black\"/></svg>')",
            WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><path d=\"M2,50 C2,15 15,2 50,2 C85,2 98,15 98,50 C98,85 85,98 50,98 C15,98 2,85 2,50 Z\" fill=\"black\"/></svg>')",
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%'
          }}
        >
          <MapContainer 
            center={[15, 100]} 
            zoom={3} 
            minZoom={2}
            scrollWheelZoom={false} 
            className="w-full h-full bg-[var(--ink)]"
          >
            {/* Extremely dark minimal map tiles */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              opacity={0.7}
            />
            
            {projects.map((project) => (
              <Marker 
                key={project.id} 
                position={[project.lat, project.lng]} 
                icon={createCustomIcon(project.health)}
              >
                <Popup className="custom-popup" closeButton={false}>
                  <div className="w-[320px] rounded-[24px] overflow-hidden glass-dark p-1">
                    <div className="h-40 w-full relative rounded-[1.3rem] overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/20">
                        <Activity size={14} className={project.health === 'Critical' ? 'text-[var(--coral)]' : project.health === 'Recovering' ? 'text-[var(--coral-light)]' : 'text-[var(--seafoam)]'} /> 
                        {project.health}
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-heading text-[var(--sand)] mb-4 leading-tight">{project.name}</h4>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">
                          <span>Restoration Progress</span>
                          <span className="text-[var(--seafoam)]">{project.progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--seafoam)] rounded-full relative"
                            style={{ width: `${project.progress}%` }}
                          >
                            <div className="absolute top-0 right-0 w-2 h-full bg-white blur-[2px]" />
                          </div>
                        </div>
                      </div>
                      
                      <Magnetic>
                        <button className="w-full py-3 rounded-xl bg-[var(--sand)]/5 hover:bg-[var(--sand)]/10 transition-colors border border-[var(--sand)]/10 text-center text-sm text-[var(--sand)] font-medium flex items-center justify-center gap-2 group">
                          View Deep Dive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Glow behind map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[var(--ocean-deep)] blur-[120px] -z-10 rounded-full" />
      </div>

      <style>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .custom-leaflet-icon {
          background: transparent;
          border: none;
        }
      `}</style>
    </section>
  );
};
