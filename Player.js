class Player {
  constructor(x,y) {
    this.pos=createVector(x,y);
    this.speed=0
  }

getCenter(){
  return createVector(this.pos.x+this.w/2, this.pos.y+this.h/2);
}

setSpeed(speed){
  this.speed=speed
}

  show() {
    fill(255,0,0);
    image(playerimage,this.pos.x,this.pos.y)
  }
 isHit() {
   let hit=false;

   for(let index=0;index < alienbullets.length; index++) {
     if(this.getCenter().dist(alienbullets[index].pos)<18){
       hit=true
     }
   }
   return hit;
 }
  update(){
    if (this.speed>0&&this.pos.x>width-25){
      this.speed=0;
    }
    if (this.speed<0&&this.pos.x<25){
      this.speed=0;
    }
      this.pos.x+=this.speed;
  }
}
