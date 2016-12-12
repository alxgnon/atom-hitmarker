'use babel';

import path from "path";
import { CompositeDisposable } from "atom";

var assets = {};
assets.dir = path.join(__dirname, "../assets");
assets.hitmarkerImage = path.join(assets.dir, "hitmarker.png")
assets.hitmarkerSound = path.join(assets.dir, "hitmarker.wav");

function main() {
  var mouse = {x: 0, y: 0};

  document.addEventListener("mousemove", function(e) {
    mouse.x =  e.pageX || e.clientX;
    mouse.y =  e.pageY || e.clientY;
  }, false);

  var hitmarkerImage = new Image();
  hitmarkerImage.src = assets.hitmarkerImage;
  hitmarkerImage.className = "hitmarker";
  document.body.appendChild(hitmarkerImage);

  var hitmarkerSound = new Audio(assets.hitmarkerSound);
  hitmarkerSound.volume = 0.2;

  document.body.addEventListener("mousedown", function(e) {
    hitmarkerImage.style.display = "block";
    hitmarkerImage.style.left = mouse.x - hitmarkerImage.width / 2 + "px";
    hitmarkerImage.style.top = mouse.y - hitmarkerImage.height / 2 + "px";

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
