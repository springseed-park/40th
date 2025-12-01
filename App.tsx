import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Program from './components/Program';
import Sponsorship from './components/Sponsorship';
import Messages from './components/Messages';
import RSVPModal from './components/RSVP';
import Footer from './components/Footer';

function App() {
  // Simple loading state for initial render
  const [isLoading, setIsLoading] = useState(true);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const openRsvp = () => setIsRsvpOpen(true);
  const closeRsvp = () => setIsRsvpOpen(false);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-midnight flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-gold-900 border-t-gold-500 rounded-full animate-spin"></div>
          <p className="text-gold-500 text-sm tracking-[0.5em] animate-pulse">LOADING</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-white selection:bg-gold-500 selection:text-black">
      <Navigation onOpenRsvp={openRsvp} />
      <main>
        <Hero onOpenRsvp={openRsvp} />
        <Sponsorship />
        <Program />
        <Messages />
      </main>
      <Footer />
      <RSVPModal isOpen={isRsvpOpen} onClose={closeRsvp} />
    </div>
  );
}

export default App;