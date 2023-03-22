import { Howler } from "howler";

export let AudioUtils = {
    isAudioPlaybackBlocked
};

export function isAudioPlaybackBlocked() {
    let isBlocked = false;

    if (Howler != null && Howler.state != "running") {
        isBlocked = true;
    }

    return isBlocked;
}