export class Airplane {
  constructor(img, speed, stageWidth, stageHeight) {
    this.img = img;

    this.totalFrame = 8;
    this.curFrame = 0;

    this.imgWidth = 360;
    this.imgHeight = 300;

    this.airplaneWidth = 180;
    this.airplaneHeight = 150;

    this.airplaneWidthHalf = this.airplaneWidth / 2;
    this.airplaneHeightHalf = this.airplaneHeight / 2;

    this.x = stageWidth + this.airplaneWidth;
    this.y = stageHeight + this.airplaneHeight;

    this.fps = 24;
    this.fpsTime = 1000 / this.fps;

    this.percent = 0;
    this.speed = speed;

    this.path;
  }

  animate(ctx, t, points) {
    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;

    if (now > this.fpsTime) {
      this.time = t;
      this.curFrame += 1;
      if (this.curFrame == this.totalFrame) {
        this.curFrame = 0;
      }
    }

    this.percent += this.speed;

    if (this.percent < 0) {
      this.percent = 0;
    }
    if (this.percent == 100) {
      this.percent = 0;
    }

    this.draw(ctx, points, this.percent);

    return this.percent;
  }

  draw(ctx, points, percent) {
    let point = this.getQuadBezierPoint(
      points.x1,
      points.y1,
      points.x2,
      points.y2,
      points.x3,
      points.y3,
      percent
    );
    // ctx.fillRect(points.x1, points.y1, 10, 10);
    // ctx.fillRect(points.x2, points.y2, 10, 10);
    // ctx.fillRect(points.x3, points.y3, 10, 10);
    this.drawAirplane(ctx, point);
  }

  drawAirplane(ctx, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(point.rotation);
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.airplaneWidthHalf,
      -this.airplaneHeightHalf,
      this.airplaneWidth,
      this.airplaneHeight
    );
    ctx.restore();
  }

  getQuadBezierPoint(x1, y1, x2, y2, x3, y3, percent) {
    percent = percent / 100;
    const x = this.getQuadBezierValue(x1, x2, x3, percent);
    const y = this.getQuadBezierValue(y1, y2, y3, percent);

    const tx = this.quadTangent(x1, x2, x3, percent);
    const ty = this.quadTangent(y1, y2, y3, percent);
    const rotation = -Math.atan2(tx, ty) + (270 * Math.PI) / 180;

    return { x: x, y: y, rotation: rotation };
  }

  getQuadBezierValue(p0, p1, p2, percent) {
    return (
      Math.pow(1 - percent, 2) * p0 +
      2 * (1 - percent) * percent * p1 +
      Math.pow(percent, 2) * p2
    );
  }

  //   getCubicBezierXYatPercent(startPt,controlPt1,controlPt2,endPt,percent){
  //     var x=CubicN(percent,startPt.x,controlPt1.x,controlPt2.x,endPt.x);
  //     var y=CubicN(percent,startPt.y,controlPt1.y,controlPt2.y,endPt.y);
  //     return({x:x,y:y});
  // }

  // draw(ctx, t, points) {
  //   if (!this.time) {
  //     this.time = t;
  //   }

  //   const now = t - this.time;

  //   if (now > this.fpsTime) {
  //     this.time = t;
  //     this.curFrame += 1;

  //     if (this.curFrame == this.totalFrame) {
  //       this.curFrame = 0;
  //     }
  //   }

  //   this.animate(ctx, points);
  // }

  // animate(ctx, points) {
  //   const approximatePt = this.getCoordinatesLoop(this.x, this.y, points);
  //   this.x = approximatePt.x;
  //   this.y = approximatePt.y;
  //   ctx.save();
  //   ctx.translate(this.x, this.y);
  //   ctx.rotate(approximatePt.rotation);
  //   ctx.drawImage(
  //     this.img,
  //     this.imgWidth * this.curFrame,
  //     0,
  //     this.imgWidth,
  //     this.imgHeight,
  //     -this.airplaneWidthHalf,
  //     -this.airplaneHeightHalf,
  //     this.airplaneWidth,
  //     this.airplaneHeight
  //   );
  //   ctx.restore();
  // }

  // getCoordinatesLoop(x, y, points) {
  //   for (let i = 1; i < points.length; i++) {
  //     if (
  //       (x >= points[i].x3 && x <= points[i].x3) ||
  //       (y >= points[i].y3 && y <= points[i].y3)
  //     ) {
  //       return this.getCoordinates(x, y, points[i]);
  //     }
  //   }

  //   return {
  //     x: points[0].x1,
  //     y: points[0].y1,
  //     rotation: 0,
  //   };
  // }

  // getCoordinates(x, y, points) {
  //   const total = 200;

  //   let pt = this.getPointOnQuad(
  //     points.x1,
  //     points.y1,
  //     points.x2,
  //     points.y2,
  //     points.x3,
  //     points.y3,
  //     0
  //   );
  //   let prevX = pt.x;
  //   let prevY = pt.y;
  //   for (let i = 1; i < total; i++) {
  //     const t = i / total;
  //     pt = this.getPointOnQuad(
  //       points.x1,
  //       points.y1,
  //       points.x2,
  //       points.y2,
  //       points.x3,
  //       points.y3,
  //       t
  //     );

  //     if ((x >= prevX && x <= pt.x) || (y >= prevY && y <= pt.y)) {
  //       return pt;
  //     }

  //     prevX = pt.x;
  //     prevY = pt.y;
  //   }

  //   return pt;
  // }

  // getQuadValue(p0, p1, p2, t) {
  //   return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  // }

  // getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
  //   const tx = this.quadTangent(x1, x2, x3, t);
  //   const ty = this.quadTangent(y1, y2, y3, t);
  //   const rotation = -Math.atan2(tx, ty) + (90 * Math.PI) / 180;

  //   return {
  //     x: this.getQuadValue(x1, x2, x3, t),
  //     y: this.getQuadValue(y1, y2, y3, t),
  //     rotation: rotation,
  //   };
  // }

  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
}
