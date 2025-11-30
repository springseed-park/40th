import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Heart, CreditCard } from 'lucide-react';
import SponsorListModal from './SponsorListModal';

const Sponsorship: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(10000000);

  const percentage = Math.min((currentAmount / goalAmount) * 100, 100);

  // Fetch donation data from Google Sheets
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwUd4wBcrInPgXJNQpfeBU1RNB4JEw8ZlLQhRG2Ym1o56r2J3GRroEcu_023pnBldoq8A/exec?sheet=Donations');
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          const total = data.data.reduce((sum: number, row: any) => {
            const amount = parseFloat(row.amount) || 0;
            return sum + amount;
          }, 0);
          setCurrentAmount(total);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
    const interval = setInterval(fetchDonations, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Simple animation for progress bar
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  return (
    <section id="sponsorship" className="py-24 bg-midnight relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heart className="mx-auto text-gold-500 mb-4" size={40} />
          <h2 className="font-serif text-4xl text-white mb-4">후원 안내</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            여러분의 소중한 후원이 40주년 행사를 더욱 빛나게 만듭니다.<br/>
            후원금은 행사 운영 및 동아리 발전 기금으로 투명하게 사용됩니다.
          </p>
        </div>

        {/* Progress Card */}
        <div 
          ref={elementRef}
          className={`bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-gray-400 text-sm uppercase tracking-widest block mb-1">현재 모금 현황</span>
              <span className="text-3xl md:text-5xl font-bold text-white font-serif">{percentage.toFixed(1)}%</span>
            </div>
            <div className="text-right">
              <span className="text-gold-400 font-bold text-xl md:text-2xl">{formatCurrency(currentAmount)}</span>
              <span className="text-gray-500 text-sm block">/ 목표 {formatCurrency(goalAmount)}</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden mb-8 relative">
            <div 
              className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center bg-black/30 p-6 rounded-lg border border-white/5">
            <div className="flex items-center space-x-4">
                <div className="bg-gold-500/20 p-3 rounded-full">
                    <CreditCard className="text-gold-500" size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">후원 계좌 (Bank Account)</p>
                    <p className="text-white text-lg font-bold">카카오뱅크 3333-00-0000000</p>
                    <p className="text-gray-400 text-sm">예금주: 40주년 준비위원회</p>
                </div>
            </div>
            <div className="text-left md:text-right">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded transition-colors text-sm"
                >
                    후원자 명단 보기
                </button>
            </div>
          </div>
        </div>
      </div>
      
      <SponsorListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Sponsorship;