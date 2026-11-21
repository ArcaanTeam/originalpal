import { NOTIFICATION_SOUND_URL, TOAST_SOUND_URL } from "./constants";

let toastAudio: HTMLAudioElement | null = null;
let notificationAudio: HTMLAudioElement | null = null;

let toastAudioFallback: HTMLAudioElement | null = null;
let notificationAudioFallback: HTMLAudioElement | null = null;

function createFallbackAudio(src: string): HTMLAudioElement {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = src;
  audio.load();
  return audio;
}

export function registerToastAudio(element: HTMLAudioElement | null) {
  toastAudio = element;
}

export function registerNotificationAudio(element: HTMLAudioElement | null) {
  notificationAudio = element;
}

export function getToastAudio(): HTMLAudioElement {
  toastAudioFallback ??= createFallbackAudio(TOAST_SOUND_URL);
  return toastAudio ?? toastAudioFallback;
}

export function getNotificationAudio(): HTMLAudioElement {
  notificationAudioFallback ??= createFallbackAudio(NOTIFICATION_SOUND_URL);
  return notificationAudio ?? notificationAudioFallback;
}
