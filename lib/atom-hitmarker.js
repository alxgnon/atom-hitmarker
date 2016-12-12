'use babel';

import { CompositeDisposable } from 'atom';

function main() {
  var hitmarkerBase = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjA76PVpAAABqklEQVQ4T41Ty2rCUBQMfk3d9zNKCmI1JN6AIIkVEhPjeyOkdN8K7rt3qz/gotkqiF+ggn6Dye2ceGOr9TUQuHBec85MJNd19UKhEJRKJV26E7quF6mmVqtpkqZp34vFgjcajTCbzTKRcxGMMafVakXz+Zzn8/lAMgzjxfO8cLVa8Xq9HuZyuYtMqLjdbkebzYZ3Oh1umuY+FwEGOuF6vaYm0WmTXq+XkmW5iKJou91yMKDvU4T3wE46mETUBOvs/jbJZDIGTaTJYMAdx3kToWNQEzDYLZdLakJs1HK5LNPEhHa1Wn0X6eeBCxMTPplMOFgMoc7XeDyOaVuW5Yu067BtWwXtIXZ/HAwGaTAbgo0pwrdRqVReabrv++l+v/+A9xf21kT4OlRVtbvdbrwC3vEKo9HopsQxYCqLdCapms0mFZmQ9ymRGIeNYJ7zZkNx7LDk2mj0IUIHiclspxJLnPMUEtzEYaQzko5NApDZSGLR5NdsuLhHRTdNApDEWCc2G1bcQVZG9ILZbBbT/mfPM0jMNp1OuaIogYSLP9Pj8GPcAcjM6E90XVf5AShaLyAdryewAAAAAElFTkSuQmCC";

  var mouse = {x: 0, y: 0};

  document.addEventListener("mousemove", function(e) {
    mouse.x =  e.pageX || e.clientX;
    mouse.y =  e.pageY || e.clientY;
  }, false);

  var hitmarkerImage = new Image();
  hitmarkerImage.src = hitmarkerBase;
  hitmarkerImage.style.position = "absolute";
  hitmarkerImage.style.zIndex = 2147483647;
  hitmarkerImage.style.display = "none";
  hitmarkerImage.style.pointerEvents = "none";
  document.body.appendChild(hitmarkerImage);

  document.body.addEventListener("mousedown", function(e) {
    hitmarkerImage.style.display = "block";
    hitmarkerImage.style.left = mouse.x - hitmarkerImage.width / 2 + "px";
    hitmarkerImage.style.top= mouse.y - hitmarkerImage.height / 2 + "px";

    setTimeout(function() {
      hitmarkerImage.style.display = "none";
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
