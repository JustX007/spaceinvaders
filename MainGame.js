let player;
let aliens = [];
let bullets = []
let alienbullets=[]
let playerPng=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWklEQVRYhe2TQQ4AEAwE/WD//9q6OIlSohXsJE0cMHMgJUIIIZcjZf4MEGXtLrVMjBiAAHAPUQWGgC0R2mV1gOXMcsAorLfHlePf0PXlz8jDI1qyvwIIIe+QAb6lTsHTVAqSAAAAAElFTkSuQmCC"
let playerimage;
let alienPng=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIxSURBVEiJ3VY9iBNBFP5m3t4lHHvZ6BlZs9GInAd2YmUjWBwp7MRWtE6jlbXY2FhpY63Yip3FcYWl1WEn6CFEL0c0Hm7OHCS5zBuLzMR1MoZTMAd+sDx475vv7XzMH+CglsT15WplsFytDNzaNNgxtSSuuzX5J0J/i5k0EW5Cj3ICAFaqlR4AvG9szf9O4Kyx9V1jK28lBKCznImZiBGJBcAaDtsDy7Fj3AbeJv8CE3ZdjUs3PwZz9wBACpQBgDW2AaDILFIptY0+zqnh/t0XrfaTrGbgNtkjWuiQLDvpMgAIAXSkHEcfZ0/TgluYrV2rSfy8CzlX0Kq6Q3QOAGKlbgDAZ6KnABCxQkcSIqVESqSznJbhLCn1dldQIwTvrzdb135pcv5k+XtXylzEPLZi0yxdu/uPMOOblOPo49jxIXP/zaftRWBWdl1KTtwHgJJS822ifoHVhS9EqwCQ13gAAD2BOwBQVIyU5Dj6OMeVWt+VtFFSKtcmGgCAsNN8tJMmV7rddi2J6x+C4KHvj3x2uTgzHN5ea7YevwzD0q2lYhOYkV1BkRkAQGYRhIpFJNlLXlRKMKALJmZrdgWFioXVs9pBaqatzKAuSe3ZaFZId6SENNGHozQ6CRSgrfbh2VU0dmlzHllEzEJr6IhZsHbsMmfYge1Kf2600wf9W7tKD80uOb4GM7A5Dcjsl+W4tWk6E/dJFu6L5WK/V3vW+vrqenzs8utcfi1b25xyRf8/r5UfWLL+UucBGoEAAAAASUVORK5CYII="
let alienimage;
let score=0;
let level=1;
let gameover=false

function preload(){
  playerimage=loadImage(playerPng)
  alienimage=loadImage(alienPng)
}

function setup() {
  createCanvas(400, 400);
  player = new Player(250, 350)
setupaliens()

}
function setupaliens(){
  score=0
  level=1
  gameover=false
  aliens=[]
  for (let index = 0; index < 7; index++) {
    for (let rad = 0; rad < 4; rad++)
      aliens.push(new Enemy(30 + index * 50, 50 + rad * 30))
  }
}

function drawaliens() {
  let aliensCollided = false
  for (let index = 0; index < aliens.length; index++) {

    if (aliens[index].hasCollided()) {
      aliensCollided = true;
    }
  }
  for (let index = aliens.length - 1; index >= 0; index--) {
    if (aliensCollided) {
      aliens[index].turn();
    }
    aliens[index].show();
    aliens[index].update();

    for (let index2 = bullets.length - 1; index2 >= 0; index2--) {
      if (aliens[index].pos.dist(bullets[index2].pos) < 18) {
        score++;
        aliens[index].skalSlettes = true
        bullets[index2].skalSlettes = true
      }
    }
if (aliens[index].pos.y >= height-80) {
  gameover=true

  setTimeout(setupaliens,5000)
}
  }

  if (aliens.length==0){
    level++;
    setupaliens()
  }
}

function drawbullets() {
  for (let index = bullets.length - 1; index >= 0; index--) {

    bullets[index].show();
    bullets[index].update();

    if (bullets[index].pos.y < 0)
      bullets.splice(index);

  }

  for (let index = alienbullets.length - 1; index >= 0; index--) {

    alienbullets[index].show();
    alienbullets[index].update();

    if (alienbullets[index].pos.y > height)
      alienbullets.splice(index);

  }
}

function slettfigurer() {
  for (let index = aliens.length - 1; index >= 0; index--) {
    if (aliens[index].skalSlettes) {
      aliens.splice(index, 1)
    }
  }
  for (let index2 = bullets.length - 1; index2 >= 0; index2--) {
    if (bullets[index2].skalSlettes) {
      bullets.splice(index2, 1)
    }
  }
}

function draw() {
  if (gameover){
    text("GAME CRASH 404, RESTARTING",200,200)
  }else {
    rectMode(CENTER);
      background(255);
      fill(255, 0, 0)
      player.show();
      player.update();
      drawaliens();
      drawbullets();
      slettfigurer();

      fill(0)

      if (player.isHit()){
        gameover=true;
      }

  }


}



function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setSpeed(-2);
  }

  if (keyCode === RIGHT_ARROW) {
    player.setSpeed(2);
  }

  if (keyCode === DOWN_ARROW) {

    player.setSpeed(0);
  }

  if (key === ' ') {
    if (bullets.length <= 0) {
      bullets.push(new Bullet(player.pos.x, player.pos.y,21))
    }
  }
}
