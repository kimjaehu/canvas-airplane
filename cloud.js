export class Cloud {
  constructor(index, totalPoints, width, height) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.width = width;
    this.height = height;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.init();
  }

  init() {
    this.points = [];
  }

  draw(ctx) {}
}
