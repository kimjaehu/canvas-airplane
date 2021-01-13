import { Path } from "./path.js";
import { Background } from "./background.js";

class App {
  constructor() {
    // logo
    this.logo = document.createElement("IMG");
    this.logo.classList.add("logo");
    this.logo.setAttribute("src", "klm_logo_white.png");
    this.logo.setAttribute("alt", "KLM Logo");
    document.body.appendChild(this.logo);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.paths = [];
    this.particles = [];

    this.light = "#89cff0";
    this.dark = "#00a3e0";

    this.background = new Background(this.light, this.dark);

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

    this.background.backgroundColor(this.paths);

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.background.backgroundColor(this.paths);

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

    this.background.backgroundColor(this.paths);

    this.paths.push(
      new Path(this.ctx, cx, cy, this.stageWidth, this.stageHeight)
    );
  }
}

window.onload = () => {
  new App();
};
