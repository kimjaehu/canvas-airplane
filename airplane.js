export class Airplane {
  constuctor(img, stageWidth, stageHeight) {
    this.img = img;

    this.totalFrame = 8;
    this.curFrame = 0;

    this.imgWidth = 360;
    this.imgHeight = 300;

    this.airplaneWidth = 180;
    this.airplaneHeight = 150;

    this.airplaneHalf = this.airplaneWidth / 2;

    this.fps = 24;
    this.fpsTime = 1000 / this.fps;

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x;
    this.y;
  }

  draw(ctx, t, points) {
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
    this.animate(ctx, points);
  }

  animate(ctx, points) {
    const approximatePt = this.getCoordinates(points);
    this.x = approximatePt.x;
    this.y = approximatePt.y;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(approximatePt.rotation);
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.airplaneWidthHalf,
      -this.airplaneHeight + 20,
      this.airplaneWidth,
      this.airplaneHeight
    );

    ctx.restore();
  }

  getCoordinates(points) {
    for (let i = 0; i < points.length; i++) {
      let pt = {};
      const total = 200;
      for (let cnt = 1; cnt < total; cnt++) {
        const t = i / total;
        let pt = this.getPointOnQuad(
          points[i].x1,
          points[i].y1,
          points[i].x2,
          points[i].y2,
          points[i].x3,
          points[i].y3,
          t
        );
      }
      return pt;
    }
  }

  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    const tx = this.quadTangent(x1, x2, x3, t);
    const ty = this.quadTangent(y1, y2, y3, t);
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI) / 180;
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
      rotation: rotation,
    };
  }

  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
}
