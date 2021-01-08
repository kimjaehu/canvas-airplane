import { Airplane } from "./airplane.js";

export class AirplaneController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "airplane.png";

    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.airplane = new Airplane(this.img, this.stageHeight, this.stageWidth);
  }

  draw(ctx, t, points) {
    this.loaded();
    console.log(this.airplane);
    if (this.isLoaded) {
      this.airplane.draw(ctx, t, points);
    }
  }
}
