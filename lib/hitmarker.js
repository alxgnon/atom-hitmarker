'use babel';

import path from "path";
import { CompositeDisposable } from "atom";

function createImage() {
  let el = new Image();
  el.src = path.join(__dirname, "../assets/hitmarker.png");
  el.className = "hitmarker";
  document.body.appendChild(el);
  return el;
}

function createSound() {
  let el = new Audio(path.join(__dirname, "../assets/hitmarker.wav"));
  el.volume = 0.2;
  return el;
}

export default {
  initialize() {
    this.image = createImage();
    this.sound = createSound();
    this.mousedown = this.mousedown.bind(this);
    this.afterMousedown = this.afterMousedown.bind(this);
    this.initialized = true;
  },

  mousedown(e) {
    if (e.button == 0) {
      this.image.style.display = "block";
      this.image.style.left = e.clientX - this.image.width / 2 + "px";
      this.image.style.top = e.clientY - this.image.height / 2 + "px";
      setTimeout(this.afterMousedown, 50);
    }
  },

  afterMousedown() {
    this.image.style.display = "none";
    this.sound.currentTime = 0;
    this.sound.play();
  },

  enable() {
    if (!this.initialized) this.initialize();
    document.body.addEventListener("mousedown", this.mousedown, false);
    this.active = true;
  },

  disable() {
    document.body.removeEventListener("mousedown", this.mousedown);
    this.active = false;
  },

  toggle() {
    this.active ? this.disable() : this.enable();
  },

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "hitmarker:toggle": () => this.toggle(),
      "hitmarker:enable": () => this.enable(),
      "hitmarker:disable": () => this.disable()
    }));

    if (atom.config.get("hitmarker.autoEnable")) {
      this.enable();
    }
  },

  deactivate() {
    this.subscriptions.dispose();
    this.disable();
  },

  config: {
    autoEnable: {
      title: "Auto Enable",
      description: "Enable on start.",
      type: "boolean",
      default: true
    }
  }
};
