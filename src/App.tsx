import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './sections/Hero';
import { ImpactStats } from './sections/ImpactStats';
import { TheCrisis } from './sections/TheCrisis';
import { Mission } from './sections/Mission';
import { GetInvolved } from './sections/GetInvolved';
import { GlobalMap } from './sections/GlobalMap';
import { Stories } from './sections/Stories';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { CausticLight } from './components/ui/CausticLight';
import { AudioToggle } from './components/ui/AudioToggle';



function App() {
  return (
    <div className="bg-[var(--foam)] min-h-screen text-[var(--ink)]">
      <CausticLight />
      <AudioToggle />
      
      <Navbar />
      
      <main>
        <Hero />
        <ImpactStats />
        <TheCrisis />
        <Mission />
        <GetInvolved />
        <GlobalMap />
        <Stories />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
