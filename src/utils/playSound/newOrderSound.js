import audio from "../../assets/img/sound/audio.mp3";
import Toastify from 'toastify-js'


export function playAudio() {
    let mySound = new Audio(audio);
    mySound.play();
    Toastify({
        text: "Nueva orden recibida",
        className: "info",
        style: {
         background: "#008000",
        },
        offset: {
          x: 70, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
}