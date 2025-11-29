import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section id="about" className="py-24 md:py-32 bg-midnight relative overflow-hidden">
      {/* Subtle Background Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-deepblue via-midnight to-black opacity-80" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-900 to-transparent opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Image Side */}
        <div 
          ref={elementRef}
          className={`relative aspect-[4/5] md:aspect-square overflow-hidden transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <img 
            src="https://images.unsplash.com/photo-1531169559633-96cb951569e3?auto=format&fit=crop&q=80&w=1000" 
            alt="Club Members" 
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 rounded-sm shadow-2xl"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold-500/30 -z-10 rounded-sm" />
          <div className="absolute inset-0 bg-gold-500/10 hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Text Side */}
        <div className={`space-y-8 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="font-serif text-4xl md:text-5xl text-white drop-shadow-md">
            열정으로 써 내려간 <br/>
            <span className="text-gold-500 italic">40년의 역사</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-transparent" />
          <p className="text-gray-300 leading-relaxed text-lg font-light">
            지난 40년 동안 우리는 서로 다른 불꽃으로 만나 하나의 큰 빛을 만들어왔습니다. 
            단순한 모임이 아닌, 인생의 가장 뜨거운 순간을 함께한 우리의 이야기를 기념합니다.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg font-light">
            1984년 작은 동아리방에서 시작된 우리의 여정은 이제 수많은 동문의 
            자부심이 되었습니다. 과거를 추억하고 미래를 그리는 이 특별한 밤에 
            주인공이 되어주세요.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
            <div>
              <span className="block text-5xl font-serif text-white font-bold mb-1">40</span>
              <span className="text-xs text-gold-500 uppercase tracking-[0.2em]">주년 (Years)</span>
            </div>
            <div>
              <span className="block text-5xl font-serif text-white font-bold mb-1">1,200+</span>
              <span className="text-xs text-gold-500 uppercase tracking-[0.2em]">누적 회원</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;