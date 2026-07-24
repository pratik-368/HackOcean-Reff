
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { ImpactStats } from './sections/ImpactStats';
import { TheCrisis } from './sections/TheCrisis';
import { Mission } from './sections/Mission';
import { GetInvolved } from './sections/GetInvolved';
import { GlobalMap } from './sections/GlobalMap';
import { Stories } from './sections/Stories';
import { FinalCTA } from './sections/FinalCTA';

import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis root>
      <div className="bg-[var(--sand)] min-h-screen text-[var(--ink)] selection:bg-[var(--coral)]">
        <Navbar />
        
        <main>
          <Hero />
          <ImpactStats />
          <TheCrisis />
          <Mission />
          <GetInvolved />
          <GlobalMap />
          <Stories />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
