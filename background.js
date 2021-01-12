export class Background {
  constructor(light, dark) {
    this.light = light;
    this.dark = dark;
  }

  backgroundColor(paths) {
    if (paths.length > 0) {
      document.body.style.backgroundColor = this.light;
      document.body.style.transition = "all 3s";
    } else {
      document.body.style.backgroundColor = this.dark;
      document.body.style.transition = "all 3s";
    }
  }
}
