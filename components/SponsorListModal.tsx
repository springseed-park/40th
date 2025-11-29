import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SponsorListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sponsors = [
  '1기 김철수', '1기 이영희', '2기 박민수', '2기 최지우', 
  '3기 홍길동', '3기 강동원', '4기 정우성', '4기 송중기', 
  '5기 아이유', '5기 유재석', '6기 강호동', '6기 신동엽', 
  '7기 박명수', '7기 정준하', '8기 하동훈', '8기 노홍철', 
  '9기 정형돈', '9기 길성준', '10기 전진', '10기 황광희',
  '11기 양세형', '11기 조세호', '12기 남창희', '12기 이광수', 
  '13기 김종국', '13기 송지효', '14기 지석진', '14기 양세찬', 
  '15기 전소민', '15기 하하', '16기 유연석', '16기 손호준',
  '익명 후원자 1', '익명 후원자 2'
];

const SponsorListModal: React.FC<SponsorListModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      <div className={`relative w-full max-w-2xl bg-midnight border border-gold-500/30 shadow-2xl rounded-sm transform transition-all duration-300 flex flex-col max-h-[80vh] ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <h3 className="text-xl font-serif text-white tracking-wide">후원자 명단 (Sponsors)</h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-8">
            <p className="text-gray-300">
              어울소리 40주년 행사를 위해 따뜻한 마음을 모아주신<br/>
              모든 선후배님들께 깊은 감사를 드립니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {sponsors.map((name, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-center text-sm text-gray-300 hover:border-gold-500/50 hover:text-gold-400 hover:bg-white/10 transition-all duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20 text-center">
           <p className="text-gray-500 text-xs mb-3">* 후원 내역 확인 및 명단 누락 문의: 010-0000-0000 (총무)</p>
           <button 
             onClick={handleClose} 
             className="px-8 py-2 border border-gray-600 text-gray-300 hover:border-gold-500 hover:text-gold-500 transition-colors rounded-sm text-sm uppercase tracking-wider"
           >
              닫기
           </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorListModal;