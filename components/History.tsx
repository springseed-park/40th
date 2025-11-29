import React from 'react';
import { TimelineItem } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const historyData: TimelineItem[] = [
  { year: '1984', title: '동아리 창립', description: '서울 종로구 혜화동에서 5명의 창립 멤버로 동아리 설립.' },
  { year: '1994', title: '창립 10주년', description: '회원 수 100명 돌파, 첫 공식 전시회 및 동문회 개최.' },
  { year: '2004', title: '전국 단위 확장', description: '전국 대학 연합 동아리로 확장, 사회 봉사단 창단.' },
  { year: '2014', title: '30주년 기념', description: '30주년 기념 비전 선포식 및 장학재단 설립.' },
  { year: '2024', title: '새로운 도약', description: '40주년을 맞아 글로벌 네트워크 구축 및 새로운 미래 준비.' },
];

const TimelineCard: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={elementRef}
      className={`mb-12 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : ''} group`}
    >
      <div className="hidden md:block w-5/12" />
      
      {/* Center Line Dot */}
      <div className="z-20 flex items-center order-1 bg-midnight shadow-xl w-8 h-8 rounded-full border-2 border-gold-500 relative">
        <div className={`mx-auto w-3 h-3 bg-gold-500 rounded-full transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} />
      </div>
      
      {/* Card Content */}
      <div className={`order-1 w-full md:w-5/12 px-6 py-4 transition-all duration-1000 transform ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : isEven 
            ? 'opacity-0 -translate-x-20' 
            : 'opacity-0 translate-x-20'
      }`}>
        <div className="bg-deepblue p-6 border-l-2 border-gold-500/20 hover:border-gold-500 transition-colors duration-300">
          <span className="text-gold-500 font-bold text-xl font-serif mb-2 block">{item.year}</span>
          <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const History: React.FC = () => {
  return (
    <section id="history" className="py-24 bg-[#080818] relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl text-white mb-4">동아리 연혁</h2>
          <p className="text-gold-500 uppercase tracking-widest text-sm">40년의 발자취 (History)</p>
        </div>

        <div className="relative wrap overflow-hidden p-4 h-full">
          {/* Vertical Line */}
          <div className="border-2-2 absolute border-opacity-20 border-gold-500 h-full border left-4 md:left-1/2" style={{ transform: 'translateX(-50%)' }}></div>
          
          {historyData.map((item, index) => (
            <TimelineCard key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;