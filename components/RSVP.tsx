import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '83학번',
    phone: '',
    companions: '본인 외 없음',
    message: ''
  });

  // Generate student ID options: 83~99, 00~26
  const generateStudentIdOptions = () => {
    const options = [];
    // 1983 to 1999
    for (let i = 83; i <= 99; i++) {
      options.push(`${i}학번`);
    }
    // 2000 to 2026
    for (let i = 0; i <= 26; i++) {
      const year = i.toString().padStart(2, '0');
      options.push(`${year}학번`);
    }
    return options;
  };

  const studentIdOptions = generateStudentIdOptions();

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      sheet: 'RSVP',
      data: {
        name: formData.name,
        studentId: formData.studentId,
        phone: formData.phone,
        companions: formData.companions,
        message: formData.message,
        timestamp: new Date().toISOString()
      }
    };

    console.log('Sending RSVP data:', payload);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzJ2ZC8f6u3DM6fEHvNYELh5LCAuUl9WYcASJICY5qBJ4BxpWsuJ72t5Kk6AqDuv6WHLg/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const result = await response.json();
      console.log('RSVP Response:', result);

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          studentId: '83학번',
          phone: '',
          companions: '본인 외 없음',
          message: ''
        });
      } else {
        alert('신청 중 오류가 발생했습니다: ' + (result.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-lg bg-midnight border border-gold-500/30 shadow-2xl rounded-sm transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif text-white mb-2">참가 신청</h3>
                <p className="text-gray-400 text-sm">40주년 기념 행사에 참석해주셔서 감사합니다.<br/>정확한 인원 파악을 위해 정보를 입력해주세요.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold-500 mb-2">성함 *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm" placeholder="홍길동" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold-500 mb-2">학번 *</label>
                        <select required value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm appearance-none cursor-pointer">
                          {studentIdOptions.map((option) => (
                            <option key={option} value={option} className="bg-midnight text-white">
                              {option}
                            </option>
                          ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold-500 mb-2">연락처 *</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm" placeholder="010-0000-0000" />
                    </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold-500 mb-2">동반 인원 *</label>
                  <select required value={formData.companions} onChange={(e) => setFormData({...formData, companions: e.target.value})} className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm">
                    <option>본인 외 없음</option>
                    <option>본인 외 1인</option>
                    <option>본인 외 2인</option>
                    <option>본인 외 3인 이상</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold-500 mb-2">남기실 말씀</label>
                  <textarea rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none" placeholder="문의사항이나 축하 메시지를 남겨주세요"></textarea>
                </div>
              </div>

              <button type="submit" className="w-full bg-gold-600 text-black font-bold uppercase tracking-widest py-4 hover:bg-gold-500 transition-colors mt-6 rounded-sm shadow-lg shadow-gold-600/20">
                신청 완료하기
              </button>
            </form>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">
              <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/30">
                <Check size={40} className="text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-white mb-2">신청이 완료되었습니다</h3>
                <p className="text-gray-300">행사 당일에 뵙겠습니다.<br/>초대장은 입력하신 연락처로 발송됩니다.</p>
              </div>
              <button onClick={handleClose} className="px-8 py-3 border border-gray-600 text-white hover:border-gold-500 hover:text-gold-500 transition-colors rounded-sm uppercase text-sm tracking-wider">
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RSVPModal;