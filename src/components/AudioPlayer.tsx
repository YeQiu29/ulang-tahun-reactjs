import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// --- PETUNJUK MENGGUNAKAN FILE AUDIO LOKAL ---
//
// 1. BUAT FOLDER BARU: Di dalam folder `src` proyek Anda, buat folder
//    bernama `music` atau `assets`. Contoh: `src/music/`
//
// 2. SALIN FILE AUDIO: Salin file MP3 Anda ke dalam folder `src/music/`.
//
// 3. IMPORT FILE AUDIO: Di bawah ini, hapus komentar (`//`) pada baris `import`
//    dan pastikan path-nya benar.
//
import mySong from '../music/jamrud.mp3.mp3'; // Ganti nama file-nya

export interface AudioPlayerControls {
  play: () => void;
  pause: () => void;
}

const AudioPlayer: React.ForwardRefRenderFunction<AudioPlayerControls> = (_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // Mulai dengan audio tidak dibisukan agar bisa langsung play
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 4. GUNAKAN FILE AUDIO: Ganti string kosong di bawah dengan variabel
  //    yang sudah Anda import. Contoh: const audioUrl = mySong;
  // const audioUrl = ""; // Ganti dengan `mySong` setelah di-import
  const audioUrl = mySong; // Ganti dengan nama file yang sesuai

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  // Fungsi untuk mencoba auto-play saat komponen dimuat
  useEffect(() => {
    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Autoplay berhasil
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(error => {
        // Autoplay diblokir oleh browser, biarkan user menekan tombol play
        console.log("Autoplay was prevented:", error);
        setIsPlaying(false);
        setIsMuted(true); // Mulai dalam keadaan mute jika autoplay gagal
        if (audioRef.current) audioRef.current.muted = true;
      });
    }
  }, [audioUrl]);


  useImperativeHandle(ref, () => ({
    play() {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    },
    pause() {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
  }));

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      // Jika menyalakan suara dan musik sedang tidak berjalan, putar musiknya
      if (!newMutedState && audioRef.current.paused) {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={audioUrl} />
      <button
        onClick={toggleMute}
        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-110"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

export default forwardRef(AudioPlayer);
