import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-gray-700">SINCE 1984</h2>
        <p className="text-gray-500 text-xs tracking-widest">
          © 2024 Club 40th Anniversary. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4">
            <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">Instagram</a>
            <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-gold-500 transition-colors">Youtube</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;