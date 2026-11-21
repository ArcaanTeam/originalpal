import { NOTIFICATION_SOUND_URL, TOAST_SOUND_URL } from "./constants";
import {
  registerNotificationAudio,
  registerToastAudio,
} from "./toast-audio-store";

export function ToastSoundPreloader() {
  return (
    <div aria-hidden className="sr-only">
      <audio preload="auto" ref={registerToastAudio} src={TOAST_SOUND_URL} />
      <audio
        preload="auto"
        ref={registerNotificationAudio}
        src={NOTIFICATION_SOUND_URL}
      />
    </div>
  );
}
