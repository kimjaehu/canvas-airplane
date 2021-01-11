import { AirplaneController } from "./airplane-controller.js";

export class Path {
  constructor(ctx, cx, cy, stageWidth, stageHeight) {
    this.x = cx;
    this.y = cy;
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.total = 8;
    this.points = [];
    this.initialSize = this.getSize();

    this.airplaneController = new AirplaneController();
  }

  draw(ctx, t) {
    this.points = this.getGoldenSpiralPoints();
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 5;

    let x1, y1, x2, y2, x3, y3;

    for (let i = 0; i < this.points.length; i++) {
      x1 = this.points[i].x1;
      y1 = this.points[i].y1;
      x2 = this.points[i].x2;
      y2 = this.points[i].y2;
      x3 = this.points[i].x3;
      y3 = this.points[i].y3;

      ctx.beginPath();
      ctx.moveTo(x1, y1);

      // ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);

      ctx.quadraticCurveTo(x2, y2, x3, y3);

      // ctx.fillRect(x1, y1, 10, 10);
      // ctx.fillRect(x2, y2, 10, 10);
      // ctx.fillRect(x3, y3, 10, 10);

      ctx.stroke();
    }
    this.airplaneController.draw(ctx, t, this.points);

    return this.points;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = this.getGoldenSpiralPoints();
    return this.points;
  }

  getGoldenSpiralPoints() {
    let points = [];
    let initialSize = this.initialSize;
    let direction = 1;
    let prevSize = 0;
    let size = 0;
    let x = this.x;
    let y = this.y;
    let x1 = x,
      y1 = y,
      x2 = x,
      y2 = y,
      x3 = x,
      y3 = y;

    let i = 0;

    while (
      x1 < this.stageWidth &&
      x1 > 0 &&
      y1 < this.stageHeight &&
      y1 > 0 &&
      x2 < this.stageWidth &&
      x2 > 0 &&
      y2 < this.stageHeight &&
      y2 > 0 &&
      x3 < this.stageWidth &&
      x3 > 0 &&
      y3 < this.stageHeight &&
      y3 > 0
    ) {
      if (points.length === 0) {
        if (x <= this.stageWidth / 2 && y <= this.stageHeight / 2) {
          x1 = this.stageWidth;
          y1 = (y + this.stageHeight) / 2;
          x2 = x;
          y2 = (y + this.stageHeight) / 2;
          x3 = x;
          y3 = y;
        }

        if (x > this.stageWidth / 2 && y <= this.stageHeight / 2) {
          x1 = (this.stageWidth - x) / 2;
          y1 = this.stageHeight;
          x2 = x;
          y2 = (y + this.stageHeight) / 2;
          x3 = x;
          y3 = y;
        }

        if (x <= this.stageWidth / 2 && y > this.stageHeight / 2) {
          x1 = this.stageWidth;
          y1 = (y + this.stageHeight) / 2;
          x2 = x;
          y2 = (y + this.stageHeight) / 2;
          x3 = x;
          y3 = y;
        }

        if (x > this.stageWidth / 2 && y > this.stageHeight / 2) {
          x1 = 0;
          y1 = (y + this.stageHeight) / 2;
          x2 = x;
          y2 = (y + this.stageHeight) / 2;
          x3 = x;
          y3 = y;
        }

        points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          x3: x3,
          y3: y3,
        });
        x1 = x;
        y1 = y;
      } else {
        direction > 4 && (direction = 1);
        if (i < 1) {
          size = initialSize + prevSize;
        } else {
          size = initialSize + prevSize;
        }

        if (i === 0) {
          x1 = x;
          y1 = y;
          x2 = x;
          y2 = y - initialSize;
          x3 = x + initialSize;
          y3 = y - initialSize;
        } else {
          switch (direction) {
            case 1:
              x1 = x;
              y1 = y;
              x2 = x + size;
              y2 = y;
              x3 = x + size;
              y3 = y + size;
              break;
            case 2:
              x1 = x;
              y1 = y;
              x2 = x;
              y2 = y + size;
              x3 = x - size;
              y3 = y + size;
              break;
            case 3:
              x1 = x;
              y1 = y;
              x2 = x - size;
              y2 = y;
              x3 = x - size;
              y3 = y - size;
              break;
            case 4:
              x1 = x;
              y1 = y;
              x2 = x;
              y2 = y - size;
              x3 = x + size;
              y3 = y - size;
              break;
          }
          direction++;
        }

        points.push({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          x3: x3,
          y3: y3,
        });

        x = x3;
        y = y3;
        initialSize = prevSize;
        prevSize = size;
        i++;
      }
    }
    return points;
  }

  getSize() {
    const min = 25;
    const range = min * 10;
    return min + Math.random() * range;
  }
}
