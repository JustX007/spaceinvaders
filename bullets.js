class Bullet {
  constructor(x,y,speed) {
    this.pos=createVector(x,y);
    this.speed=speed
    this.w=5
    this.h=10
    this.skalSlettes=false
  }


setSpeed(speed){
  this.speed=speed
}

  show() {
    fill(255,0,0);
    rect(this.pos.x,
      this.pos.y, this.w,this.h);
  }

  update(){
this.pos.y-=this.speed
  }
}
