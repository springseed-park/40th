import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenRsvp: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenRsvp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRsvpClick = () => {
    setIsMenuOpen(false);
    onOpenRsvp();
  };

  // Updated navigation links: Removed '소개', '연혁' and added '축하 메시지'
  const navLinks = [
    { name: '축하 메시지', id: 'messages' },
    { name: '행사 일정', id: 'program' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-midnight/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="cursor-pointer font-bold text-2xl tracking-widest text-gold-400 hover:text-white transition-colors drop-shadow-md"
        >
          SINCE 1984
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium tracking-widest text-gray-200 hover:text-gold-400 transition-colors drop-shadow-sm"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
             {/* Sponsorship Button */}
             <button
               onClick={() => scrollToSection('sponsorship')}
               className="px-5 py-2 border border-white/50 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-midnight transition-all shadow-md rounded-sm"
            >
              후원하기
            </button>
            {/* RSVP Button */}
            <button
               onClick={onOpenRsvp}
               className="px-5 py-2 border border-gold-500 text-gold-500 text-xs font-bold tracking-widest hover:bg-gold-500 hover:text-black transition-all shadow-md rounded-sm"
            >
              참가 신청
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white drop-shadow-md">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-lg font-bold text-white hover:text-gold-400"
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
             <button
               onClick={() => scrollToSection('sponsorship')}
               className="w-full py-3 border border-white/50 text-white font-bold tracking-widest hover:bg-white hover:text-midnight transition-colors rounded-sm"
            >
              후원하기
            </button>
            <button
               onClick={handleRsvpClick}
               className="w-full py-3 bg-gold-500 text-black font-bold tracking-widest hover:bg-gold-400 transition-colors rounded-sm"
            >
              참가 신청
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;