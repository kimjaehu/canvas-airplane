import { PathController } from "./path-controller.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.pathController = new PathController();

    window.addEventListener("resize", this.resize.bind(this), false);
    window.addEventListener("mousedown", this.onDown.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.pathController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.pathController.draw(this.ctx, t);
  }

  onDown(e) {
    let cx = e.clientX;
    let cy = e.clientY;

    this.pathController.addPath(cx, cy);
  }
}

window.onload = () => {
  new App();
};
