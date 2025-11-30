import React from 'react';
import { ProgramItem } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';

const programData: ProgramItem[] = [
  { time: '17:00', title: '리셉션 (Reception)', description: '등록 및 웰컴 드링크 리셉션' },
  { time: '18:00', title: '개회식 (Opening)', description: '개회사 및 40주년 기념 영상 상영', speaker: '회장 김철수' },
  { time: '18:30', title: '특별 강연 (Special Talk)', description: '동문이 전하는 "우리의 지난 40년"', speaker: '1기 동문 대표' },
  { time: '19:10', title: '만찬 및 네트워킹', description: '호텔 코스 요리 및 자유로운 네트워킹' },
  { time: '20:30', title: '시상 및 경품 추첨', description: '공로상 시상 및 경품 추첨' },
  { time: '21:00', title: '폐회 (Closing)', description: '폐회사 및 단체 사진 촬영' },
];

const ProgramRow: React.FC<{ item: ProgramItem; index: number }> = ({ item, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div 
      ref={elementRef}
      className={`flex flex-col md:flex-row border-b border-gray-800 py-8 transition-all duration-700 transform hover:bg-white/5 px-4 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-full md:w-1/4 mb-2 md:mb-0">
        <span className="text-gold-400 font-serif text-2xl font-light">{item.time}</span>
      </div>
      <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
        {item.speaker && (
          <div className="mt-2 md:mt-0">
             <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">
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
    <section id="program" className="py-24 bg-midnight">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Calendar className="mx-auto text-gold-500 mb-4" size={40} />
          <h2 className="font-serif text-4xl text-white mb-4">행사 개요 및 일정</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            40년의 역사를 기념하는 뜻깊은 자리,<br/>
            선후배가 하나 되는 행사의 상세 일정을 안내해 드립니다.
          </p>
        </div>

        {/* Info Grid (Map & Details) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Map Section */}
            <div
                ref={mapRef}
                className={`relative h-80 rounded-lg overflow-hidden border border-gray-700 shadow-2xl transition-all duration-1000 ${
                    mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {/* Kakao Static Map */}
                <img
                    src="https://staticmap.kakao.com/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=595535&MY=792985&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo"
                    alt="행사 장소 지도"
                    className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <a
                        href="https://map.kakao.com/?urlX=595535&urlY=792985&urlLevel=3&map_type=TYPE_MAP&map_hybrid=false"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-white bg-gold-600/90 hover:bg-gold-500 px-4 py-2 rounded-full backdrop-blur-sm transition-colors text-sm font-bold"
                    >
                        <MapPin size={16} />
                        <span>카카오맵 보기</span>
                    </a>
                </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center space-y-8 p-4 md:p-8 bg-white/5 rounded-lg border border-white/10">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-gold-400 mb-1">
                        <Clock size={20} />
                        <span className="text-sm font-bold tracking-widest uppercase">일시 (Date & Time)</span>
                    </div>
                    <p className="text-2xl text-white font-serif">2026. 05. 30 (토)</p>
                    <p className="text-xl text-gray-300">17:00 ~ 21:00</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-gold-400 mb-1">
                        <MapPin size={20} />
                        <span className="text-sm font-bold tracking-widest uppercase">장소 (Location)</span>
                    </div>
                    <p className="text-2xl text-white font-serif">그랜드 워커힐 서울</p>
                    <p className="text-gray-300">서울 광진구 워커힐로 177, 애스톤 하우스</p>
                </div>

                <div className="pt-6 border-t border-gray-700 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <Phone className="text-gold-500" size={18} />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">문의 (Contact)</p>
                            <p className="text-gray-300 text-sm">02-1234-5678</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="text-gold-500" size={18} />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">이메일 (Email)</p>
                            <p className="text-gray-300 text-sm">event@club.com</p>
                        </div>
                    </div>
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