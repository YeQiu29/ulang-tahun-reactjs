import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const GallerySection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const images = [
    'https://images.pexels.com/photos/1146603/pexels-photo-1146603.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    setIsAutoPlay(false);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlay(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-peach-50 to-pink-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Camera className="text-pink-500 mr-3" size={32} />
            <h2 className="text-4xl md:text-5xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-peach-600">
              Kenangan Terindah
            </h2>
          </div>
          <p className="text-lg text-gray-600">Momen-momen berharga yang telah kita lalui bersama</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main image display */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
            <div className="relative aspect-video">
              <img
                src={images[currentImage]}
                alt={`Memory ${currentImage + 1}`}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
              
              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="text-gray-700" size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="text-gray-700" size={24} />
              </button>
            </div>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(index);
                  setIsAutoPlay(false);
                }}
                className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                  currentImage === index
                    ? 'ring-4 ring-pink-400 scale-110'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                isAutoPlay
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAutoPlay ? 'Otomatis Aktif' : 'Mulai Otomatis'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;