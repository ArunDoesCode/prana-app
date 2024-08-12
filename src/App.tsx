import React, { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import Timer from "./components/timer/Timer";
import "bootstrap/dist/css/bootstrap.css";
import "./colors.css";
import {
  startBackgroundMusic,
  stopBackgroundMusic,
} from "./utils/backgroundmusic";
import MusicPreferenceModal from "./components/musicpreferencemodal/Preference";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(true); // Modal is shown by default
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (isMusicEnabled) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [isMusicEnabled]);

  const handleCloseModal = () => setShowModal(false);

  const handleMusicPreference = (enableMusic: boolean) => {
    setIsMusicEnabled(enableMusic);
  };

  return (
    <>
      <Timer />
      <Footer />
      <MusicPreferenceModal
        show={showModal}
        handleClose={handleCloseModal}
        handleMusicPreference={handleMusicPreference}
      />
    </>
  );
};

export default App;
