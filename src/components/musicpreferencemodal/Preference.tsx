import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  startBackgroundMusic,
  stopBackgroundMusic,
} from "../../utils/backgroundmusic"; // Adjust the path if necessary

interface MusicPreferenceModalProps {
  show: boolean;
  handleClose: () => void;
  handleMusicPreference: (enableMusic: boolean) => void;
}

const MusicPreferenceModal: React.FC<MusicPreferenceModalProps> = ({
  show,
  handleClose,
  handleMusicPreference,
}) => {
  const enableMusic = () => {
    startBackgroundMusic();
    handleMusicPreference(true);
    handleClose();
  };

  const disableMusic = () => {
    stopBackgroundMusic();
    handleMusicPreference(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Background Music</Modal.Title>
      </Modal.Header>
      <Modal.Body>Would you like to enable background music?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={disableMusic}>
          No
        </Button>
        <Button variant="primary" onClick={enableMusic}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MusicPreferenceModal;
