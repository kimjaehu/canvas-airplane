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
    this.airplanes.push(
      new Airplane(this.img, this.stageHeight, this.stageWidth)
    );
  }

  draw(ctx, t, points) {
    if (this.isLoaded) {
      this.cur += 1;
      this.addAirplane();
      for (let i = this.airplanes.length - 1; i >= 0; i--) {
        this.airplanes[i].draw(ctx, t, points);
      }
    }
  }
}
