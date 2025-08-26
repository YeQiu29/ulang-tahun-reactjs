import React, { useEffect, useRef, useState } from 'react';
import { Flower2, Sparkles } from 'lucide-react';

const MessageSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const messages = [
    "Gafeliciteerd Met Je Verjaardag, Suzan Mega Virginia Tjahjono. Sorry, Web-nya agak berantakan. Karena banyak kerjaan jadi cuma buat website ucapan kecil-kecilan.",
    "Semoga di tahun ini, semua impianmu bisa tercapai.Selalu ada hal baik yang datang setiap harinya. ",
    "Tetap semangat kerjanya, walaupun banyak kerjaan, & menghadapi orang-orang yang ruweeettt....",
    "Sekali lagi, Gafeliciteerd Met Je Verjaardag, Ya! Semoga harimu penuh Tawa dan Kebahagiaan."
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Decorative elements */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <Flower2 className="text-pink-400 animate-spin-slow" size={32} />
            <Sparkles className="text-gold-400 animate-pulse" size={24} />
            <Flower2 className="text-blue-400 animate-spin-slow" size={32} />
          </div>
        </div>

        <h2 className={`text-4xl md:text-5xl font-dancing text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Pesan Dari YeQiu
        </h2>

        <div className="space-y-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light text-center">
                {message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
