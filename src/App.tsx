import React, { useState } from 'react';
import LandingSection from './components/LandingSection';
import MessageSection from './components/MessageSection';
import GallerySection from './components/GallerySection';
import CakeSection from './components/CakeSection';
import EndingSection from './components/EndingSection';
import AudioPlayer from './components/AudioPlayer';
import './styles/animations.css';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <AudioPlayer />
      <LandingSection />
      <MessageSection />
      <GallerySection />
      <CakeSection />
      <EndingSection onConfettiTrigger={() => setShowConfetti(true)} />
    </div>
  );
}

export default App;