import React from 'react';
import { ProgramItem } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';

const programData: ProgramItem[] = [
  { time: '12:00', title: '행사장 입장', description: '행사장 입장 및 차담회' },
  { time: '13:00', title: '전시 및 영상관람', description: '개회사 및 40주년 기념 영상 상영'},
  { time: '15:00', title: '사전행사', description: '사물놀이 공연, 퀴즈, 장기자랑', speaker: '사회자' },
  { time: '16:00', title: '시상', description: '개회선언, 참석자인사, 감사패 및 공로상수여' },
  { time: '17:00', title: '식사 및 담소', description: '저녁식사와 함께 담소' },
  { time: '18:00', title: '폐회', description: '폐회사 및 단체 사진 촬영' },
];

const ProgramRow: React.FC<{ item: ProgramItem; index: number }> = ({ item, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`flex flex-col md:flex-row border-b border-gray-800 py-4 md:py-6 lg:py-8 transition-all duration-700 transform hover:bg-white/5 px-3 md:px-4 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-full md:w-1/4 mb-1 md:mb-0">
        <span className="text-gold-400 font-serif text-lg md:text-xl lg:text-2xl font-light">{item.time}</span>
      </div>
      <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-0.5 md:mb-1">{item.title}</h3>
          <p className="text-gray-400 text-xs md:text-sm">{item.description}</p>
        </div>
        {item.speaker && (
          <div className="mt-1.5 md:mt-0">
             <span className="text-xs bg-gray-800 text-gray-300 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full border border-gray-700">
               {item.speaker}
             </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Program: React.FC = () => {
  const { elementRef: mapRef, isVisible: mapVisible } = useIntersectionObserver();

  return (
    <section id="program" className="py-12 md:py-20 lg:py-24 bg-midnight">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <Calendar className="mx-auto text-gold-500 mb-3 md:mb-4" size={32} />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-3 md:mb-4">행사 개요 및 일정</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            40년의 역사를 기념하는 뜻깊은 자리,<br/>
            선후배가 하나 되는 행사의 상세 일정을 안내해 드립니다.
          </p>
        </div>

        {/* Info Grid (Map & Details) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
            {/* Details Section */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8 p-4 md:p-8 bg-white/5 rounded-lg border border-white/10">
                <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center space-x-2 md:space-x-3 text-gold-400 mb-1">
                        <Clock size={16} className="md:w-5 md:h-5" />
                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase">일시 (Date & Time)</span>
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl text-white font-serif">2026. 05. 30 (토)</p>
                    <p className="text-base md:text-lg lg:text-xl text-gray-300">12:00 ~ 18:00</p>
                </div>

                <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center space-x-2 md:space-x-3 text-gold-400 mb-1">
                        <MapPin size={16} className="md:w-5 md:h-5" />
                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase">장소 (Location)</span>
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl text-white font-serif">한남대학교 무어아트홀</p>
                    <p className="text-sm md:text-base text-gray-300">대전 대덕구 한남로18번길 11</p>
                </div>
            </div>

            {/* Map Section */}
            <div
                ref={mapRef}
                className={`relative h-80 rounded-lg overflow-hidden border border-gray-700 shadow-2xl transition-all duration-1000 ${
                    mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {/* Kakao Static Map - Same location as Roughmap */}
                <img
                    src="https://staticmap.kakao.com/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=595535&MY=792985&S=0&IW=640&IH=360&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo"
                    alt="행사 장소 지도"
                    className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <a
                        href="https://map.kakao.com/?map_type=TYPE_MAP&itemId=926047643&urlLevel=3&urlX=595535&urlY=792985"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-white bg-gold-600/90 hover:bg-gold-500 px-4 py-2 rounded-full backdrop-blur-sm transition-colors text-sm font-bold"
                    >
                        <MapPin size={16} />
                        <span>카카오맵 보기</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div className="border-t border-gray-800">
          {programData.map((item, index) => (
            <ProgramRow key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;