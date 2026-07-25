import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { WaveDivider } from '../components/ui/WaveDivider';

const faqs = [
  {
    question: "Do I need to be a certified diver to volunteer?",
    answer: "Not at all. While we do have specialized roles for certified divers (such as direct coral outplanting and deep-water monitoring), a massive portion of our work happens on land or in shallow waters. From beach cleanups to lab assistance and community education, there is a role for everyone."
  },
  {
    question: "How exactly does my donation help the reefs?",
    answer: "70% of all funds go directly to active restoration projects (funding nurseries, outplanting operations, and monitoring equipment). 15% funds critical scientific research to identify heat-resilient coral strains, 10% supports local community education in coastal areas, and 5% covers our essential operational costs."
  },
  {
    question: "Is it too late to save the coral reefs?",
    answer: "No. While the situation is critical, corals are incredibly resilient when given the chance. Through methods like micro-fragmentation, we can accelerate coral growth by up to 50 times the natural rate. With immediate, scalable intervention, we can preserve these vital ecosystems for future generations."
  },
  {
    question: "Can my company partner with REEF for corporate responsibility?",
    answer: "Absolutely. We offer tailored corporate partnerships that go beyond just a logo on a website. From organizing team-building restoration days to funding specific regional nurseries, we provide tangible, reportable impact metrics for your sustainability goals."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-transparent text-[var(--foam)] relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-6 tracking-tight text-[var(--foam)]">Common Questions</h2>
          <p className="text-xl text-[var(--foam)]/80 font-normal leading-relaxed">
            Everything you need to know about our restoration methods, volunteer requirements, and financial transparency.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/10"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-xl font-medium pr-8">{faq.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-[var(--surface-blue)] border-[var(--surface-blue)] text-[#020C17]' : 'border-white/20 text-[var(--foam)]'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-[var(--foam)]/70 leading-relaxed text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Wave SVG divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full z-[5]">
        {/* We need to transition to Final CTA which is --depth-8 */}
        <WaveDivider />
      </div>
    </section>
  );
};
