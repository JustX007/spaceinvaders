class Enemy {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = 0.5 + (level / 5)
    this.w = 25;
    this.h = 25
    this.skalSlettes = false
    this.farge = createVector(random(255), random(255), random(255))
  }


  setSpeed(speed) {
    this.speed = speed
  }


  turn() {
    this.speed *= -1;
    this.pos.y += 10;


  }

  hasCollided() {
    if (this.speed > 0 && this.pos.x > width - 25) {
      return true;
    }

    if (this.speed < 0 && this.pos.x < 12.5) {
      return true;
    }
    return false;
  }




  show() {
    fill(255, 0, 0);
    image(alienimage, this.pos.x, this.pos.y)
  }

  update() {
    if (random(10000) < 5 + level) {
      alienbullets.push(new Bullet(this.pos.x+12.5, this.pos.y, -7))
    }



    this.pos.x += this.speed;
  }
}
