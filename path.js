export class Path {
  constructor(ctx, cx, cy, stageWidth, stageHeight) {
    this.x = cx;
    this.y = cy;
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.total = 8;
    this.points = this.getGoldenSpiralPoints(ctx, this.x, this.y);
  }

  draw(ctx, t) {
    ctx.fillStyle = "#cc0000";
    ctx.beginPath();

    let x1, y1, x2, y2, x3, y3;
    for (let i = 0; i < this.points.length; i++) {
      x1 = this.points[i].x1;
      y1 = this.points[i].y1;
      x2 = this.points[i].x2;
      y2 = this.points[i].y2;
      x3 = this.points[i].x3;
      y3 = this.points[i].y3;

      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);

      ctx.stroke();
    }
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  getGoldenSpiralPoints(ctx, cx, cy) {
    let points = [];
    let size = this.getSize();
    let direction = 1;
    let prevSize = 0;
    let width = 0;
    let x = this.x;
    let y = this.y;
    let x1, y1, x2, y2, x3, y3;
    let i = 0;
    // for (let i = 0; i < this.total; i++) {
    while (x < this.stageWidth || y < this.stageHeight) {
      direction > 4 && (direction = 1);
      if (i < 1) {
        width = size + prevSize;
      } else {
        width = size + prevSize;
      }

      if (i === 0) {
        x1 = x;
        y1 = y;
        x2 = x;
        y2 = y - size;
        x3 = x + size;
        y3 = y - size;
      } else {
        switch (direction) {
          case 1:
            x1 = x;
            y1 = y;
            x2 = x + width;
            y2 = y;
            x3 = x + width;
            y3 = y + width;
            break;
          case 2:
            x1 = x;
            y1 = y;
            x2 = x;
            y2 = y + width;
            x3 = x - width;
            y3 = y + width;
            break;
          case 3:
            x1 = x;
            y1 = y;
            x2 = x - width;
            y2 = y;
            x3 = x - width;
            y3 = y - width;
            break;
          case 4:
            x1 = x;
            y1 = y;
            x2 = x;
            y2 = y - width;
            x3 = x + width;
            y3 = y - width;
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
      size = prevSize;
      prevSize = width;
      i++;
    }
    console.log(points);
    return points;
  }

  getSize() {
    const min = 20;
    const range = min / 2;
    return min + Math.random() * range;
  }
}
