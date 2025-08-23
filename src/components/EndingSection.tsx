import React, { useState } from 'react';
import { Heart, Sparkles, PlayCircle } from 'lucide-react';
import { useName } from '../contexts/NameContext';

interface EndingSectionProps {
  onConfettiTrigger: () => void;
  onShowVideo: () => void;
}

const EndingSection: React.FC<EndingSectionProps> = ({ onConfettiTrigger, onShowVideo }) => {
  const { name } = useName();
  const [isExploded, setIsExploded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleHeartClick = () => {
    setIsExploded(true);
    onConfettiTrigger();
    
    setTimeout(() => {
      setShowMessage(true);
    }, 500);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti explosion */}
      {isExploded && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute confetti-piece animate-confetti"
              style={{
                left: '50%',
                top: '50%',
                backgroundColor: ['#FFB6C1', '#FFDAB9', '#B0E0E6', '#FFD700', '#DDA0DD'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center z-10">
        {!showMessage ? (
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8">
              Akhir Yang Indah
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
              Klik hati di bawah untuk kejutan spesial! 💕
            </p>

            <button
              onClick={handleHeartClick}
              className={`group relative transition-all duration-500 ${
                isExploded ? 'scale-150' : 'hover:scale-110'
              }`}
            >
              <div className="relative">
                <Heart
                  size={120}
                  className={`text-pink-500 transition-all duration-500 ${
                    isExploded ? 'animate-pulse' : 'group-hover:text-pink-600'
                  }`}
                  fill="currentColor"
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10">
                  <Heart
                    size={120}
                    className={`text-pink-300 blur-md transition-all duration-500 ${
                      isExploded ? 'animate-ping' : 'group-hover:blur-lg'
                    }`}
                    fill="currentColor"
                  />
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn space-y-8">
            <div className="relative">
              <Sparkles className="absolute -top-4 -left-4 text-yellow-400 animate-spin" size={32} />
              <Sparkles className="absolute -top-4 -right-4 text-pink-400 animate-spin" size={24} />
              <Sparkles className="absolute -bottom-4 -left-4 text-blue-400 animate-spin" size={28} />
              <Sparkles className="absolute -bottom-4 -right-4 text-purple-400 animate-spin" size={20} />
              
              <h2 className="text-5xl md:text-7xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient">
                We Love You! ❤️
              </h2>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-700 font-light">
              Selamat ulang tahun, semoga bahagia selalu! 🎉
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                Terima kasih telah menjadi bagian terpenting dalam hidup kami. 
                Semoga hari-hari mendatang dipenuhi dengan kebahagiaan, 
                kesuksesan, dan cinta yang tak terbatas. 
                <br/><br/>
                <span className="font-dancing text-2xl text-pink-600">
                  {`Happy Birthday, ${name}! 🎂✨`}
                </span>
              </p>
            </div>

            <div className="mt-12 animate-fadeInUp delay-500">
              <p className="text-xl font-semibold text-gray-800 mb-4">
                Ada Ucapan Ulang Tahun buat Kamu dari Pak Prabowo, Nih...!
              </p>
              <button
                onClick={onShowVideo}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center mx-auto"
              >
                <PlayCircle className="mr-2" />
                Lihat video
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EndingSection;