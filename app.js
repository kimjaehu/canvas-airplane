import { PathController } from "./path-controller.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    // put logo in
    // this.title = document.createElement("div");
    // this.title.classList.add("title");
    // this.title.innerHTML = "KLM";
    // document.body.appendChild(this.title);

    this.pathController = new PathController();

    window.addEventListener("resize", this.resize.bind(this), false);
    window.addEventListener("mouseup", this.onUp.bind(this), false);
    this.resize();
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

    this.pathController.draw(this.ctx, t, this.stageWidth, this.stageHeight);
  }

  onUp(e) {
    let cx = e.clientX;
    let cy = e.clientY;

    this.pathController.addPath(this.ctx, cx, cy);

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
