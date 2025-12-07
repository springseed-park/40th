import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-gray-700">한남대학교 중앙풍물패 어울소리</h2>
        <p className="text-gray-500 text-xs tracking-widest">
          © 2026 어울소리 40th Anniversary. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;