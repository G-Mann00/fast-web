import audio from "../../assets/img/sound/audio.mp3";

export function playAudio() {
    let mySound = new Audio(audio);
    mySound.play();
}