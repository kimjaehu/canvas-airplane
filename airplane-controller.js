import { Airplane } from "./airplane.js";

export class AirplaneController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "airplane.png";

    this.airplanes = [];

    this.cur = 0;
    this.speed = 0.25;
    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addAirplane();
  }

  addAirplane() {
    this.airplane = new Airplane(
      this.img,
      this.speed,
      this.stageWidth,
      this.stageHeight
    );
  }

  draw(ctx, t, points) {
    let percent;
    if (this.isLoaded) {
      percent = this.airplane.animate(ctx, t, points[this.cur]);

      percent == 100 - this.speed && this.cur++;
    }
    console.log(this.cur == points.length);

    return this.cur == points.length;
  }
}
