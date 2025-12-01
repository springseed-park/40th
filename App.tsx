import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Program from './components/Program';
import Sponsorship from './components/Sponsorship';
import Messages from './components/Messages';
import RSVPModal from './components/RSVP';
import Footer from './components/Footer';

function App() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  const openRsvp = () => setIsRsvpOpen(true);
  const closeRsvp = () => setIsRsvpOpen(false);

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