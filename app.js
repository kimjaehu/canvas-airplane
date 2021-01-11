import { PathController } from "./path-controller.js";
import { AirplaneController } from "./airplane-controller.js";

import { Path } from "./path.js";

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

    this.paths = [
      // new Path(this.ctx, 30, 10, this.stageWidth, this.stageHeight),
      // new Path(this.ctx, 10, 50, this.stageWidth, this.stageHeight),
      // new Path(this.ctx, 100, 10, this.stageWidth, this.stageHeight),
    ];

    // this.pathController = new PathController();

    // this.airplaneController = new AirplaneController();

    window.addEventListener("mouseup", this.onUp.bind(this), false);
    window.addEventListener("resize", this.resize.bind(this), false);

    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    let end = Boolean;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.paths.length; i++) {
      end = this.paths[i].draw(this.ctx, t);
      end && this.paths.splice(i, 1);
    }
  }

  onUp(e) {
    let cx = e.clientX;
    let cy = e.clientY;

    this.paths.push(
      new Path(this.ctx, cx, cy, this.stageWidth, this.stageHeight)
    );
  }
}

window.onload = () => {
  new App();
};
