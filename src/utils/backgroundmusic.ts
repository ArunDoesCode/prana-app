import { Howl } from "howler";
import backgroundmp3 from "../assets/background.m4a"; // Adjust path as needed

// Create a singleton instance of the Howl
const backgroundMusic = new Howl({
  src: [backgroundmp3],
  volume: 0.8, // Set the desired volume level
  loop: true, // Loop the music indefinitely
});

// Function to start playing the music
export const startBackgroundMusic = () => {
  if (!backgroundMusic.playing()) {
    backgroundMusic.play();
  }
};

// Function to stop playing the music
export const stopBackgroundMusic = () => {
  if (backgroundMusic.playing()) {
    backgroundMusic.stop();
  }
};
