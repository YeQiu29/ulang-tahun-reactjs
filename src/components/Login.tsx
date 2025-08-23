
import React, { useState } from 'react';
import { useName } from '../contexts/NameContext';
import Swal from 'sweetalert2';
import '../styles/animations.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [inputName, setInputName] = useState('');
  const { setName } = useName();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!inputName.trim() || !nameRegex.test(inputName.trim())) {
      Swal.fire({
        title: 'Login Gagal',
        text: 'Nama hanya boleh berisi huruf dan spasi.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi'
      });
      return;
    }

    try {
      fetch('http://localhost:3001/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputName.trim() }),
      });
    } catch (error) {
      console.error('Failed to log visitor:', error);
    }

    setName(inputName.trim());
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-dancing text-white mb-8 animate-fadeIn">Welcome</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Tuliskan namamu di sini..."
            className="w-full p-4 bg-gray-800 text-white border-2 border-gray-600 rounded-full focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition duration-300 text-center text-lg"
          />
          <button
            type="submit"
            className="mt-8 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
