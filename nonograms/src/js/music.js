import fileSoundCross from "./../assets/sounds/X.mp3";
import fileSoundClear01 from "./../assets/sounds/clear-01.wav";
import fileSoundClear02 from "./../assets/sounds/clear-02.wav";
import fileSoundBrush01 from "./../assets/sounds/brush-01.wav";
import fileSoundBrush02 from "./../assets/sounds/brush-02.wav";
import fileSoundBrush03 from "./../assets/sounds/brush-03.wav";
import fileSoundBrush04 from "./../assets/sounds/brush-04.wav";
import fileSoundBrush05 from "./../assets/sounds/brush-05.wav";
import fileSoundBrush06 from "./../assets/sounds/brush-06.wav";
import fileSoundBrush07 from "./../assets/sounds/brush-07.wav";
import fileSoundWin from "./../assets/sounds/win.mp3";
import { getRandom } from "./levelsChoice";

const soundCross = new Audio(fileSoundCross);
const soundClear01 = new Audio(fileSoundClear01);
const soundClear02 = new Audio(fileSoundClear02);
const soundBrush01 = new Audio(fileSoundBrush01);
const soundBrush02 = new Audio(fileSoundBrush02);
const soundBrush03 = new Audio(fileSoundBrush03);
const soundBrush04 = new Audio(fileSoundBrush04);
const soundBrush05 = new Audio(fileSoundBrush05);
const soundBrush06 = new Audio(fileSoundBrush06);
const soundBrush07 = new Audio(fileSoundBrush07);
const soundWin = new Audio(fileSoundWin);

const soundsClear = [soundClear01, soundClear02];

const soundsBrush = [
    soundBrush01,
    soundBrush02,
    soundBrush03,
    soundBrush04,
    soundBrush05,
    soundBrush06,
    soundBrush07,
];

export function playSoundCross() {
    playSound(soundCross);
}

export function playSoundWin() {
    soundWin.volume = 0.25;
    playSound(soundWin);
}

function playSoundClear() {
    const index = getRandom(soundsClear.length);
    playSound(soundsClear[index]);
}

function playSoundBrush() {
    const index = getRandom(soundsBrush.length);
    playSound(soundsBrush[index]);
}

export function playSoundColor(cell) {
    if (!cell.classList.contains("color")) {
        playSoundClear();
        return;
    }
    playSoundBrush();
}

function playSound(sound) {
    sound.play();
    sound.currentTime = 0;
}
