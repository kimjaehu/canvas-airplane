import { Airplane } from "./airplane.js";

export class AirplaneController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "airplane.png";

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
    this.airplane = new Airplane(this.img, this.stageHeight, this.stageWidth);
    this.isLoaded = true;
  }

  draw(ctx, t, path) {
    if (this.isLoaded) {
      this.loaded();
      this.airplane.draw(ctx, t, path);
    }
  }
}
