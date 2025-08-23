
import React, { useState, useRef } from 'react';
import { NameProvider, useName } from './contexts/NameContext';
import Login from './components/Login';
import LandingSection from './components/LandingSection';
import MessageSection from './components/MessageSection';
import GallerySection from './components/GallerySection';
import CakeSection from './components/CakeSection';
import WishSection from './components/WishSection';
import EndingSection from './components/EndingSection';
import AudioPlayer, { AudioPlayerControls } from './components/AudioPlayer';
import VideoSection from './components/VideoSection';
import './styles/animations.css';

const AppContent: React.FC = () => {
  const { name } = useName();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerControls>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setTimeout(() => setShowContent(true), 1000); // Match animation duration
  };

  const handleShowVideo = () => {
    audioPlayerRef.current?.pause();
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    audioPlayerRef.current?.play();
    setShowVideo(false);
  };

  return (
    <div className="overflow-x-hidden">
      {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}

      <div
        className={`fixed inset-0 bg-black z-40 split-pane split-left ${isLoggedIn ? 'split-away' : ''}`}
      />
      <div
        className={`fixed inset-0 bg-black z-40 split-pane split-right ${isLoggedIn ? 'split-away' : ''}`}
      />

      {showContent && (
        <>
          <AudioPlayer ref={audioPlayerRef} />
          <LandingSection />
          <MessageSection />
          <GallerySection />
          <CakeSection />
          <WishSection />
          <EndingSection onConfettiTrigger={() => {}} onShowVideo={handleShowVideo} />
        </>
      )}

      {showVideo && <VideoSection onClose={handleCloseVideo} />}
    </div>
  );
};

function App() {
  return (
    <NameProvider>
      <AppContent />
    </NameProvider>
  );
}

export default App;
