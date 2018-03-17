AFRAME.registerComponent('joycon-controls', {
  schema: {
    rotationSpeed: {default: 100},
    translationSpeed: {default: 5}
  },
  init: function() {
    var gamepads = navigator.getGamepads();
    if (!Array.isArray(gamepads)) {
      gamepads = Object.keys(gamepads).map(index => gamepads[index]);
    }
    this.joyLeft = gamepads.find(pad => pad.id.indexOf('Joy-Con (L)') === 0);
    this.joyRight = gamepads.find(pad => pad.id.indexOf('Joy-Con (R)') === 0);

  },
  tick: function(d, dt) {
    var rotation = this.el.getAttribute('rotation');
    if (this.joyRight.axes[5]) {
      rotation.y -= this.joyRight.axes[5] * this.data.rotationSpeed * dt / 1000;
    }
    if (this.joyRight.axes[4]) {
      rotation.x += this.joyRight.axes[4] * this.data.rotationSpeed * dt / 1000
    }

    this.el.setAttribute('rotation', rotation);

    if (this.joyLeft.axes[4]) {
      this.el.object3D.translateZ(this.joyLeft.axes[4] * this.data.translationSpeed * dt / 1000);
    }
    if (this.joyLeft.axes[5]) {
      this.el.object3D.translateX(-this.joyLeft.axes[5] * this.data.translationSpeed * dt / 1000);
    }

    this.el.object3D.position.y = 1.5;
  }
});
