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
    this.airplane = new Airplane(this.img, this.stageWidth, this.stageHeight);
  }

  draw(ctx, t, points) {
    if (this.isLoaded) {
      this.airplane.animate(ctx, t, points);
    }
  }
}
