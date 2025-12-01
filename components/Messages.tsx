import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Send, MessageSquare, Quote, X, PenTool } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  studentId: string; // Changed from generation to studentId
  content: string;
  date: string;
}

const initialMessages: Message[] = [
  { id: 1, name: '김철수', studentId: '84학번', content: '40주년을 진심으로 축하합니다! 어울소리 영원하라!', date: '2024.05.01' },
  { id: 2, name: '이영희', studentId: '95학번', content: '선배님들 후배님들 모두 보고 싶습니다. 행사 날 뵈어요.', date: '2024.05.02' },
  { id: 3, name: '박민수', studentId: '12학번', content: '뜻깊은 자리에 함께할 수 있어 영광입니다. 준비하시느라 고생 많으셨습니다.', date: '2024.05.05' },
  { id: 4, name: '최지우', studentId: '20학번', content: '동아리방에서의 추억이 새록새록 떠오르네요. 40주년 축하드려요!', date: '2024.05.06' },
];

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

const Messages: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [newName, setNewName] = useState('');
  const [newStudentId, setNewStudentId] = useState('83학번');
  const [newContent, setNewContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContent) return;

    const newMessage: Message = {
      id: Date.now(),
      name: newName,
      studentId: newStudentId,
      content: newContent,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    };

    try {
      const payload = {
        sheet: 'Guestbook',
        data: {
          name: newName,
          studentId: newStudentId,
          content: newContent,
          date: newMessage.date,
          timestamp: new Date().toISOString()
        }
      };

      console.log('Sending message data:', payload);

      const response = await fetch('https://script.google.com/macros/s/AKfycbzJ2ZC8f6u3DM6fEHvNYELh5LCAuUl9WYcASJICY5qBJ4BxpWsuJ72t5Kk6AqDuv6WHLg/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const result = await response.json();
      console.log('Message Response:', result);
    } catch (error) {
      console.error('Error submitting message:', error);
    }

    setMessages([newMessage, ...messages]);
    setNewName('');
    setNewStudentId('83학번');
    setNewContent('');
    setIsModalOpen(false);
  };

  // Fetch messages from Google Sheets every 30 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzJ2ZC8f6u3DM6fEHvNYELh5LCAuUl9WYcASJICY5qBJ4BxpWsuJ72t5Kk6AqDuv6WHLg/exec?sheet=Guestbook');
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          const formattedMessages: Message[] = data.data.map((row: any, index: number) => ({
            id: row.timestamp ? new Date(row.timestamp).getTime() : Date.now() - index,
            name: row.name || '',
            studentId: row.studentId || '',
            content: row.content || '',
            date: row.date || ''
          })).sort((a, b) => b.id - a.id); // Sort by newest first
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 30000);

    return () => clearInterval(interval);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <section id="messages" className="py-24 bg-[#0a0a20] relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <MessageSquare className="mx-auto text-gold-500 mb-4" size={40} />
          <h2 className="font-serif text-4xl text-white mb-4">축하 메시지</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            어울소리의 40번째 생일을 축하해주세요.<br/>
            여러분의 따뜻한 한마디가 큰 힘이 됩니다.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-600 text-black font-bold text-lg rounded-sm hover:bg-gold-500 transition-all shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-1"
          >
            <PenTool size={20} />
            메시지 남기기
          </button>
        </div>

        {/* Message Grid - Full Width */}
        <div
            ref={elementRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {isLoading ? (
              // Loading Skeleton
              [...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 animate-pulse"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-700 rounded w-4/6"></div>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                      <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              ))
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`group relative bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <Quote className="absolute top-4 right-4 text-white/5 group-hover:text-gold-500/20 transition-colors" size={40} />
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 min-h-[4rem] relative z-10 break-keep">
                    "{msg.content}"
                  </p>
                  <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                      <span className="text-gold-400 font-bold text-sm">{msg.name}</span>
                      <span className="text-gray-500 text-xs mt-0.5">{msg.studentId}</span>
                    </div>
                    <span className="text-gray-600 text-xs font-mono">{msg.date}</span>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>

      {/* Write Message Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsModalOpen(false)}
            />
            <div className="relative w-full max-w-md bg-midnight border border-gold-500/30 shadow-2xl rounded-sm animate-fade-in-up">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <h3 className="text-xl font-serif text-white tracking-wide">메시지 작성</h3>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-xs text-gold-500/80 mb-2 uppercase tracking-wider">이름 (Name)</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors placeholder-gray-600"
                            placeholder="성함을 입력해주세요"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs text-gold-500/80 mb-2 uppercase tracking-wider">학번 (Class of)</label>
                        <div className="relative">
                            <select
                                value={newStudentId}
                                onChange={(e) => setNewStudentId(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                {studentIdOptions.map((opt) => (
                                    <option key={opt} value={opt} className="bg-midnight text-white">
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gold-500/80 mb-2 uppercase tracking-wider">축하 메시지 (Message)</label>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            required
                            rows={5}
                            className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors resize-none placeholder-gray-600"
                            placeholder="따뜻한 축하의 말을 남겨주세요"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold-600 hover:bg-gold-500 text-black font-bold py-4 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 mt-2"
                    >
                        <Send size={18} />
                        등록하기
                    </button>
                </form>
            </div>
        </div>
      )}
    </section>
  );
};

export default Messages;