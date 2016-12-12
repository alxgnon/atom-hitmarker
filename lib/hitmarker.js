'use babel';

import path from "path";
import { CompositeDisposable } from "atom";

const ASSETS_DIR = path.join(__dirname, "../assets");
const HITMARKER_IMAGE = path.join(ASSETS_DIR, "hitmarker.png")
const HITMARKER_SOUND = path.join(ASSETS_DIR, "hitmarker.wav");

function main() {
  var hitmarkerImage = new Image();
  hitmarkerImage.src = HITMARKER_IMAGE;
  hitmarkerImage.className = "hitmarker";
  document.body.appendChild(hitmarkerImage);

  var hitmarkerSound = new Audio(HITMARKER_SOUND);
  hitmarkerSound.volume = 0.2;

  document.body.addEventListener("mousedown", function(e) {
    hitmarkerImage.style.display = "block";
    hitmarkerImage.style.left = e.clientX - hitmarkerImage.width / 2 + "px";
    hitmarkerImage.style.top = e.clientY - hitmarkerImage.height / 2 + "px";

    setTimeout(function() {
      hitmarkerImage.style.display = "none";
      hitmarkerSound.currentTime = 0;
      hitmarkerSound.play();
    }, 50);
  }, false);
}

export default {
  activate() {
    this.subscriptions = new CompositeDisposable();
    main();
  },

  deactivate() {
    this.subscriptions.dispose();
  }
};
