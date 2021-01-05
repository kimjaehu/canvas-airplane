export class PathController {
  constructor(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.paths = [];
    this.cur = 0;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  addPath(cx, cy) {
    // this.paths.push(new Path(cx, cy));
    this.paths.push({ cx, cy });
  }

  draw(ctx, t) {
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      console.log(path);
      //   path.draw(ctx, t, path.cx, path.cy);
    }
  }
}
