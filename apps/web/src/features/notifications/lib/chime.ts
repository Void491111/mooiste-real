import { NOTIFICATION_CONFIG } from "@/config/notifications.config";

let context: AudioContext | null = null;

function getContext() {
  if (context === null) {
    context = new AudioContext();
  }

  return context;
}

/** Browser bisukan suara sampai ada interaksi pertama dari user. */
export function unlockChime() {
  const audio = getContext();

  if (audio.state === "suspended") {
    void audio.resume();
  }
}

export function playChime() {
  const audio = getContext();

  if (audio.state === "suspended") return;

  const { frequencyHz, durationMs, volume, repeat } = NOTIFICATION_CONFIG.chime;
  const seconds = durationMs / 1000;

  for (let index = 0; index < repeat; index += 1) {
    const startAt = audio.currentTime + index * seconds * 1.4;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequencyHz;
    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + seconds);

    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + seconds);
  }
}