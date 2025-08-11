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
    "Di hari istimewa ini, aku ingin memberitahumu betapa berartinya kamu dalam hidupku. Setiap detik bersamamu adalah anugerah yang tak ternilai.",
    "Kamu adalah cahaya yang menerangi hari-hari gelapku, senyuman yang menghangatkan hatiku, dan cinta yang membuat hidup ini begitu bermakna.",
    "Selamat ulang tahun, sayang. Semoga tahun ini membawa lebih banyak kebahagiaan, kesuksesan, dan momen-momen indah yang akan kita kenang selamanya.",
    "Aku berdoa agar semua impianmu terwujud, agar kesehatan selalu menyertaimu, dan agar cinta kita terus tumbuh lebih kuat setiap harinya."
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
          Pesan Dari Hati
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