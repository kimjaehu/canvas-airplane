import { Path } from "./path.js";

import { AirplaneController } from "./airplane-controller.js";

export class PathController {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.paths = [];
    this.cur = 0;

    this.airplaneController = new AirplaneController();
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  addPath(ctx, cx, cy) {
    this.paths.push(new Path(ctx, cx, cy, this.stageWidth, this.stageHeight));
  }

  draw(ctx, t) {
    let points;
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      points = path.draw(ctx, t);
    }

    this.airplaneController.draw(ctx, t, points);
  }
}
