import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

// --- PETUNJUK PENTING UNTUK MENGGUNAKAN FOTO LOKAL ---
//
// 1. BUAT FOLDER BARU: Di dalam folder `src` proyek Anda, buatlah folder baru
//    bernama `assets` atau `images`. Contoh: `project/src/assets/`
//
// 2. SALIN FOTO ANDA: Salin semua file foto Anda (suzan1.jpg, suzan2.jpg, dll.)
//    ke dalam folder `src/assets/` yang baru Anda buat.
//
// 3. IMPORT FOTO: Di bawah ini, hapus komentar (`//`) pada baris-baris `import`
//    dan pastikan path-nya benar sesuai lokasi file Anda. Tambahkan `import`
//    untuk setiap foto yang ingin Anda tampilkan.
//
import suzanImage1 from '../assets/suzan1.jpg';
import suzanImage2 from '../assets/suzan2.jpg';
import suzanImage3 from '../assets/suzan3.jpg'; // Contoh jika ada foto lain
import suzanImage4 from '../assets/suzan4.jpg';
// import suzanImage5 from './assets/suzan5.jpg'; // Contoh jika ada foto lain


const GallerySection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 4. GUNAKAN FOTO YANG DI-IMPORT: Ganti string placeholder di bawah ini
  //    dengan nama variabel yang sudah Anda import di atas.
  const images = [
    // Menggunakan variabel yang sudah di-import, bukan string URL
    suzanImage1,
    suzanImage2,
    suzanImage3,
    suzanImage4
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
              Foto Was Terindah
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
          <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(index);
                  setIsAutoPlay(false);
                }}
                className={`relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
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
