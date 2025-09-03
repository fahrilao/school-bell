export const playBell = (repetitions = 1) => {
  const audio = document.getElementById("bell-audio");
  try {
    audio.volume = 0.7;
    audio.play().catch((error) => {
      console.warn("Could not play bell sound:", error);
      playSystemNotification();
    });
    let delay = 0;
    for (let i = 0; i < repetitions - 1; i++) {
      delay += 4500;
      setTimeout(() => {
        audio.currentTime = 0;
      }, delay);
    }
  } catch (error) {
    console.warn("Audio not supported:", error);
    playSystemNotification();
  }
};

const playSystemNotification = () => {
  // Create a visual notification as fallback
  if ("Notification" in window) {
    // Request permission for notifications
    if (Notification.permission === "granted") {
      new Notification("School Bell", {
        body: "Bell is ringing!",
        icon: "/favicon.ico",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("School Bell", {
            body: "Bell is ringing!",
            icon: "/favicon.ico",
          });
        }
      });
    }
  }

  // Also try to use the Web Audio API to generate a beep sound
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // Bell-like frequency
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  } catch (error) {
    console.warn("Web Audio API not supported:", error);
  }
};
