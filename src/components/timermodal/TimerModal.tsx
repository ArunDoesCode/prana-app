import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Howl } from "howler";
import inhalemp3 from "../../assets/inhale.mp3";
import exhalemp3 from "../../assets/exhale.mp3";
import holdmp3 from "../../assets/hold.mp3";

interface TimerModalProps {
  show: boolean;
  handleClose: () => void;
  totalTime: number;
  inhale: number;
  hold: number;
  exhale: number;
  cycle: number;
  isPlaying: boolean;
}

const TimerModal: React.FC<TimerModalProps> = ({
  show,
  handleClose,
  totalTime,
  inhale,
  hold,
  exhale,
  cycle,
  isPlaying,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [shouldStartTimer, setShouldStartTimer] = useState<boolean>(false); // State to control when the main timer starts

useEffect(() => {
  if (show) {
    const initialCycles = 2;
    let bufferCyclesCompleted = 0;
    const timeoutIds: number[] = []; // Array to store all timeout IDs

    const playSound = (sound: string) => {
      const soundInstance = new Howl({
        src: [sound],
        volume: 0.5, 
      });
      soundInstance.play();
      
    };

    const playBufferCycles = () => {
      if (bufferCyclesCompleted < initialCycles) {
        setCurrentMessage("Inhale...");
        playSound(inhalemp3);
        const inhaleTimeout = setTimeout(() => {
          setCurrentMessage("Exhale...");
          playSound(exhalemp3);
          const exhaleTimeout = setTimeout(() => {
            bufferCyclesCompleted++;
            playBufferCycles(); // Recursive call to complete all buffer cycles
          }, exhale * 1000);
          timeoutIds.push(exhaleTimeout);
        }, inhale * 1000);
        timeoutIds.push(inhaleTimeout);
      } else {
        setShouldStartTimer(true); // Start the main timer after buffer cycles are done
        startMainCycles();
      }
    };

    const startMainCycles = () => {
      let cycleIndex = 1;
      const displayMessage = () => {
        setCurrentMessage(`Cycle ${cycleIndex}`);
        const cycleTimeout = setTimeout(() => {
          setCurrentMessage("Inhale...");
          playSound(inhalemp3);
          const inhaleTimeout = setTimeout(() => {
            setCurrentMessage("Hold...");
            playSound(holdmp3);
            const holdTimeout = setTimeout(() => {
              setCurrentMessage("Exhale...");
              playSound(exhalemp3);
              const exhaleTimeout = setTimeout(() => {
                if (cycleIndex < cycle) {
                  cycleIndex++;
                  displayMessage(); // Continue with the next cycle
                } else {
                  setCurrentMessage("Cycle End");
                  setShouldStartTimer(false); // Stop the timer after all cycles are done
                }
              }, exhale * 1000);
              timeoutIds.push(exhaleTimeout);
            }, hold * 1000);
            timeoutIds.push(holdTimeout);
          }, inhale * 1000);
          timeoutIds.push(inhaleTimeout);
        }, 0); // Start immediately after the cycle message
        timeoutIds.push(cycleTimeout);
      };
      displayMessage(); // Start the first main cycle
    };

    playBufferCycles(); // Start the initial buffer cycles

    return () => {
      // Clear all timeouts when the effect is cleaned up (e.g., when `show` changes)
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      setShouldStartTimer(false); // Reset timer state when the modal is closed
    };
  }
}, [show, inhale, hold, exhale, cycle]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Timer</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center flex-column align-items-center">
        <CountdownCircleTimer
          isPlaying={shouldStartTimer && isPlaying}
          duration={totalTime}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={handleClose}
        >
          {({ remainingTime }) => <div>{remainingTime} seconds</div>}
        </CountdownCircleTimer>
        <div className="mt-3">{currentMessage}</div>
      </Modal.Body>
    </Modal>
  );
};

export default TimerModal;
