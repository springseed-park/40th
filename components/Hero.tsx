import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenRsvp: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenRsvp }) => {
  const [dDay, setDDay] = useState<number>(0);

  useEffect(() => {
    const calculateDDay = () => {
      const targetDate = new Date('2026-05-30T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDDay(diffDays);
    };

    calculateDDay();
    const timer = setInterval(calculateDDay, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?q=80&w=2073&auto=format&fit=crop"
          alt="Fireworks Background" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* D-Day Counter */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-block border border-gold-500/50 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
            <span className="text-gold-400 font-bold tracking-widest text-lg md:text-2xl drop-shadow-md">
              D-{dDay}
            </span>
          </div>
          <p className="text-gray-200 text-xs md:text-sm tracking-[0.3em] uppercase mt-3 shadow-black drop-shadow-lg font-semibold">
            2026년 5월 30일
          </p>
        </div>

        {/* Title Group */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-100 tracking-[0.2em] mb-4 font-bold font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            한남대학교 풍물놀이패
          </div>

          <h1 className="mb-6 font-bold leading-tight">
            <span className="text-3xl md:text-4xl lg:text-5xl relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 filter brightness-110 py-2">
              어울소리 창립 40주년 행사
            </span>
          </h1>
        </div>

        <p className="text-white font-medium text-lg md:text-xl tracking-wide max-w-2xl mx-auto mb-12 animate-fade-in-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/20 p-4 rounded-lg backdrop-blur-[2px] text-left" style={{ animationDelay: '0.5s' }}>
          일시 : 2026년 5월 30일<br/>
          장소 : 한남대학교 무어아트홀
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <button 
            onClick={onOpenRsvp}
            className="group relative min-w-[200px] px-8 py-4 bg-gold-600 text-black font-bold uppercase tracking-widest hover:bg-gold-500 transition-all rounded-sm shadow-xl hover:shadow-gold-500/30 border border-gold-400"
          >
            참가 신청하기
          </button>
          
          <button 
            onClick={() => document.getElementById('sponsorship')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative min-w-[200px] px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-widest hover:border-gold-500 hover:text-gold-400 hover:bg-black/80 transition-all rounded-sm backdrop-blur-md bg-black/40 shadow-lg"
          >
            후원하기
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;