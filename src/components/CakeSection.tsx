import React, { useState } from 'react';
import { Cake, Flame } from 'lucide-react';

const CakeSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>(Array(5).fill(false));
  const [allLit, setAllLit] = useState(false);

  const lightCandle = (index: number) => {
    const newCandles = [...candlesLit];
    newCandles[index] = true;
    setCandlesLit(newCandles);

    if (newCandles.every(candle => candle)) {
      setAllLit(true);
      // Trigger confetti or celebration effect
      setTimeout(() => {
        // Add celebration animation
      }, 500);
    }
  };

  const lightAllCandles = () => {
    setCandlesLit(Array(5).fill(true));
    setAllLit(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-yellow-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
          Tiup Lilinnya! 🎂
        </h2>
        
        <p className="text-lg text-gray-600 mb-12">
          Klik setiap lilin untuk menyalakannya, atau klik tombol untuk menyalakan semuanya sekaligus
        </p>

        {/* Cake illustration */}
        <div className="relative mb-12 mt-24">
          <div className="cake-container mx-auto relative">
            {/* Cake base */}
            <div className="cake-base bg-gradient-to-b from-pink-300 to-pink-400 w-80 h-32 rounded-t-full mx-auto relative shadow-2xl">
              {/* Cake decorations */}
              <div className="absolute inset-0 bg-gradient-to-b from-pink-200/50 to-transparent rounded-t-full"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-script text-lg">
                Happy Birthday!
              </div>
            </div>

            {/* Candles */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {candlesLit.map((isLit, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => lightCandle(index)}
                    className="candle bg-yellow-200 w-4 h-12 rounded-t-full shadow-md hover:scale-110 transition-transform duration-200 relative"
                  >
                    {/* Candle flame */}
                    {isLit && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="flame w-3 h-6 bg-gradient-to-t from-orange-400 via-yellow-400 to-red-400 rounded-full animate-flicker shadow-glow">
                          <div className="flame-inner w-1.5 h-3 bg-gradient-to-t from-yellow-300 to-white rounded-full mx-auto"></div>
                        </div>
                      </div>
                    )}
                  </button>
                  
                  {/* Wick */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-800 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Light all candles button */}
        <button
          onClick={lightAllCandles}
          className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
            allLit
              ? 'bg-green-500 text-white shadow-lg animate-pulse'
              : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl'
          }`}
        >
          {allLit ? '🎉 Semua Lilin Menyala!' : 'Nyalakan Semua Lilin 🔥'}
        </button>

        {/* Celebration message */}
        {allLit && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl border-2 border-yellow-300 animate-fadeIn">
            <p className="text-2xl font-dancing text-gray-700 mb-2">✨ Selamat! ✨</p>
            <p className="text-lg text-gray-600">
              Semua lilin telah menyala! Sekarang tutup mata dan buat permintaan terbaik 💫
            </p>
          </div>
        )}

        {/* Floating sparkles when all candles are lit */}
        {allLit && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CakeSection;