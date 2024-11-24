let rainDrops = [];
let squares = [];
let startingX = -100;

function setup() {
  createCanvas(600, 600);
  for(let i = 0;i <= 300; i++)
    {
      rainDrops.push(new rainDrop());
    }
}

function draw() {
  background(0);
  for(let i = 0; i < rainDrops.length - 1; i++)
  {
    rainDrops[i].drawDrop();
    rainDrops[i].fall();

    if (rainDrops[i].y > height)
    {
      rainDrops[i].reset();
    }

  }
}

class rainDrop {
  constructor() {
    this.x = random(- 100,width);
    this.y = random(-height,0);
    this.size = random(5,10);
    this.speed = random(8,10);

  }

  fall() {
    this.y = this.y + this.speed;
    this.x = this.x + 1;
  }

  drawDrop(){
    stroke(0, 0, 255);
    strokeWeight(2);
    line(this.x, this.y, this.x + 2, this.y + this.size);
  }

  reset()
  {
    this.x = random(startingX, width);
    this.y = 0;
  }
}

