
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const WishSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3001/api/wishes', { message });
      setMessage('');
      Swal.fire({
        title: 'Terkirim!',
        text: 'Semoga semua keinginanmu tercapai.',
        icon: 'success',
        confirmButtonText: 'Aamiin'
      });
    } catch (error) {
      console.error('Error submitting wish:', error);
      Swal.fire({
        title: 'Oops...',
        text: 'Gagal mengirim pesan. Coba lagi nanti.',
        icon: 'error',
        confirmButtonText: 'Oke'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
          Tulis Pesan atau Keinginanmu
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Apa harapan dan doamu di usiamu yang sekarang? Tuliskan di sini.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan pesanmu di sini..."
            className="w-full h-40 p-4 border-2 border-pink-200 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition duration-300 shadow-lg"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className={`mt-8 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              isSubmitting
                ? 'bg-gray-400 text-white'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl'
            }`}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default WishSection;
