export class Path {
  constructor(ctx, cx, cy, stageWidth, stageHeight) {
    this.x = cx;
    this.y = cy;
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.total = 1;
  }

  draw(ctx, t) {
    ctx.fillStyle = "#cc0000";
    ctx.beginPath();

    let points;
    let x1, y1, x2, y2, x3, y3;
    points = this.getGoldenSpiralPoints(this.ctx, this.x, this.y);
    console.log(points);
    x1 = points[0].x1;
    y1 = points[0].y1;
    x2 = points[0].x2;
    y2 = points[0].y2;
    x3 = points[0].x3;
    y3 = points[0].y3;

    ctx.arc(x1, y1, 20, 0, 2 * Math.PI, false);
    ctx.arc(x2, y2, 20, 0, 2 * Math.PI, false);
    ctx.arc(x3, y3, 20, 0, 2 * Math.PI, false);
    ctx.fill();
    // for (let i = 0; i < points.length; i++) {
    //   ctx.fillStyle = "#cc0000";
    //   ctx.beginPath();

    //   x1 = points[i].x1;
    //   y1 = points[i].y1;
    //   x2 = points[i].x2;
    //   y2 = points[i].y2;
    //   x3 = points[i].x3;
    //   y3 = points[i].y3;

    //   ctx.arc(x1, y1, 20, 0, 2 * Math.PI, false);
    //   console.log(x1, y1, x2, y2, x3, y3);
    // }
  }

  //   direction > 4 && (direction = 1);
  //   if (i < 1) {
  //     width = size + prevSize;
  //   } else {
  //     width = size + prevSize;
  //   }

  //   if (i === 0) {
  //     this.x = this.x;
  //     this.y = this.y;
  //     vx += size;
  //     vy += size;
  //   } else {
  //     switch (direction) {
  //       case 1:
  //         this.x += prevSize;
  //         this.y = this.y;
  //         vx = this.x;
  //         vy = vy + size;
  //         break;
  //       case 2:
  //         this.x -= size;
  //         this.y += prevSize;
  //         vx = this.x;
  //         vy = this.y;
  //         break;
  //       case 3:
  //         this.x -= width;
  //         this.y -= size;
  //         vx = vx;
  //         vy = this.y;
  //         break;
  //       case 4:
  //         this.x = this.x;
  //         this.y -= width;
  //         vx = this.x + width;
  //         vy = vy;
  //         break;
  //     }
  //     direction++;

  getGoldenSpiralPoints(ctx, cx, cy) {
    let points = [];
    let size = this.getSize();
    let direction = 1;
    let prevSize = 0;
    let width = 0;
    let x = this.x;
    let y = this.y;
    let x1, y1, x2, y2, x3, y3;

    for (let i = 0; i < this.total; i++) {
      direction > 4 && (direction = 1);
      if (i < 1) {
        width = size + prevSize;
      } else {
        width = size + prevSize;
      }
      switch (direction) {
        case 1:
          x1 = x;
          y1 = y;
          x2 = x;
          y2 = y + size;
          x3 = x + size;
          y3 = y + size;
          break;
        case 2:
          x1 = x;
          y1 = y;
          x2 = x;
          y2 = y + size;
          x3 = x + size;
          y3 = y + size;
          break;
        case 3:
          x1 = x;
          y1 = y;
          x2 = x;
          y2 = y + size;
          x3 = x + size;
          y3 = y + size;
          break;
        case 4:
          x1 = x;
          y1 = y;
          x2 = x;
          y2 = y + size;
          x3 = x + size;
          y3 = y + size;
          break;
      }
      points.push({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3,
      });
      size = prevSize;
      prevSize = width;
    }

    return points;
  }

  getSize() {
    const min = 50;
    const range = min / 2;
    return min + Math.random() * range;
  }
}
