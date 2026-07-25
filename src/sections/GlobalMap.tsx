import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { WaveDivider } from '../components/ui/WaveDivider';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, Activity, MapPin, Target, Shield, Calendar, Users } from 'lucide-react';
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
    area: '1.2M sq ft',
    species: 124,
    years: 5,
    partners: 'GBR Foundation, NOAA'
  },
  {
    id: 2,
    name: 'Florida Keys Nursery',
    lat: 25.0343,
    lng: -80.5255,
    health: 'Recovering',
    progress: 72,
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=400',
    area: '850k sq ft',
    species: 45,
    years: 8,
    partners: 'Mote Marine Lab'
  },
  {
    id: 3,
    name: 'Raja Ampat Protection Zone',
    lat: -0.2333,
    lng: 130.5167,
    health: 'Stable',
    progress: 90,
    image: 'https://images.unsplash.com/photo-1620921575225-780c10972b22?auto=format&fit=crop&q=80&w=400',
    area: '2.5M sq ft',
    species: 320,
    years: 12,
    partners: 'Conservation Intl'
  }
];

// Custom animated marker
const createCustomIcon = (health: string) => {
  const colorClass = health === 'Critical' ? 'bg-[var(--sunlight)]' : health === 'Recovering' ? 'bg-[var(--ocean)]' : 'bg-[var(--surface-blue)]';
  
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer">
        <div class="absolute inset-0 rounded-full ${colorClass} opacity-30 group-hover:opacity-60 group-hover:scale-150 transition-all duration-500 animate-ping"></div>
        <div class="relative w-4 h-4 rounded-full ${colorClass} shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-[var(--deep-blue)] group-hover:scale-125 transition-transform duration-300"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export const GlobalMap = () => {
  return (
    <section id="global-map" className="py-32 bg-transparent relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 mb-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading mb-6 text-[var(--foam)] tracking-tight">Global Impact</h2>
            <p className="text-xl text-[var(--foam)]/80 font-normal leading-relaxed">
              Explore our active restoration sites and protection zones across the world's oceans. Every marker represents a restored future.
            </p>
          </div>
          
          <div className="flex gap-6 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm shrink-0">
            <div className="flex items-center gap-3 text-sm text-[var(--foam)] font-medium tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--sunlight)] shadow-[0_0_10px_var(--sunlight)]"></span> Critical
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--foam)] font-medium tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ocean)] shadow-[0_0_10px_var(--ocean)]"></span> Recovering
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--foam)] font-medium tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface-blue)] shadow-[0_0_10px_var(--surface-blue)]"></span> Stable
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full h-[500px] relative px-6 md:px-12 mb-20">
        <div className="w-full h-full relative z-10 water-mask rounded-[2rem] overflow-hidden border border-white/10">
          <MapContainer 
            center={[15, 100]} 
            zoom={3} 
            minZoom={2}
            scrollWheelZoom={false} 
            className="w-full h-full bg-transparent"
          >
            {/* Dark minimal map tiles */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              opacity={0.8}
            />
            
            {projects.map((project) => (
              <Marker 
                key={project.id} 
                position={[project.lat, project.lng]} 
                icon={createCustomIcon(project.health)}
              >
                <Popup className="custom-popup" closeButton={false}>
                  <div className="w-[320px] rounded-[24px] overflow-hidden bg-[#020C17]/90 backdrop-blur-xl border border-[var(--surface-blue)]/20 shadow-xl p-1">
                    <div className="h-40 w-full relative rounded-[1.3rem] overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover water-mask" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white border border-white/30">
                        <Activity size={14} className={project.health === 'Critical' ? 'text-[var(--sunlight)]' : project.health === 'Recovering' ? 'text-[var(--ocean)]' : 'text-[var(--surface-blue)]'} /> 
                        {project.health}
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-heading text-white mb-4 leading-tight">{project.name}</h4>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-[var(--foam)]/80 mb-2 font-medium tracking-wide uppercase">
                          <span>Restoration Progress</span>
                          <span className="text-[var(--surface-blue)] font-bold">{project.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--surface-blue)] rounded-full relative"
                            style={{ width: `${project.progress}%` }}
                          >
                          </div>
                        </div>
                      </div>
                      
                      <Magnetic>
                        <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-center text-sm text-[var(--foam)] font-semibold flex items-center justify-center gap-2 group link-flow pb-3">
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
      </div>

      {/* Program / Site Showcase Spec Cards */}
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <h3 className="text-3xl font-heading text-[var(--foam)] mb-8">Flagship Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20 p-8 flex flex-col hover:bg-white/15 transition-colors duration-300"
            >
              <h4 className="text-2xl font-heading text-[var(--foam)] mb-6">{project.name}</h4>
              
              <div className="flex flex-col gap-4 text-sm text-[var(--foam)]/80">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-[var(--surface-blue)]" /> Location</span>
                  <span className="font-medium text-[var(--foam)]">{project.lat > 0 ? 'Northern' : 'Southern'} Hemisphere</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2"><Target size={16} className="text-[var(--surface-blue)]" /> Area Restored</span>
                  <span className="font-medium text-[var(--foam)]">{project.area}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2"><Shield size={16} className="text-[var(--surface-blue)]" /> Species Monitored</span>
                  <span className="font-medium text-[var(--foam)]">{project.species}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-[var(--surface-blue)]" /> Years Active</span>
                  <span className="font-medium text-[var(--foam)]">{project.years} Yrs</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-2"><Users size={16} className="text-[var(--surface-blue)]" /> Partners</span>
                  <span className="font-medium text-[var(--foam)] text-right max-w-[120px] truncate" title={project.partners}>{project.partners}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
      
      {/* Wave SVG divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        <WaveDivider />
      </div>
    </section>
  );
};
