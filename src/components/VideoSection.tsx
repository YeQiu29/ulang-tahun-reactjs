import React from 'react';
import video from '../assets/air.mp4';

interface VideoSectionProps {
  onClose: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ onClose }) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl mx-4">
        <video
          src={video}
          controls
          autoPlay
          className="w-full rounded-lg shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-all"
          aria-label="Close video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </section>
  );
};

export default VideoSection;
