import React from 'react';
import { GalleryImage } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const images: GalleryImage[] = [
  { id: 1, url: 'https://picsum.photos/600/600?random=1', caption: '1998 여름 수련회', span: false },
  { id: 2, url: 'https://picsum.photos/600/300?random=2', caption: '2005 정기 공연', span: true },
  { id: 3, url: 'https://picsum.photos/600/600?random=3', caption: '2010 동계 워크샵', span: false },
  { id: 4, url: 'https://picsum.photos/600/600?random=4', caption: '농촌 봉사 활동', span: false },
  { id: 5, url: 'https://picsum.photos/600/600?random=5', caption: '30주년 기념식', span: false },
];

const GalleryItem: React.FC<{ image: GalleryImage }> = ({ image }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div 
      ref={elementRef}
      className={`relative group overflow-hidden ${image.span ? 'md:col-span-2' : ''} h-64 md:h-80 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <img 
        src={image.url} 
        alt={image.caption} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-gold-400 font-serif text-xl border-b border-gold-400 pb-1">{image.caption}</span>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-[#080818]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-white mb-4">활동 갤러리</h2>
          <p className="text-gray-400">영원히 빛나는 우리의 추억</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <GalleryItem key={img.id} image={img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;