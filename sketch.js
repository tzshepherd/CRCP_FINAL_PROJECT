let rainDrops = [];
let squares = [];
let startingX = -100;
let circleRad = 25;
let colorSlider;
let rainbowMode = false;

function setup() {
  frameRate(60);
  createCanvas(600, 600);
  colorSlider = createSlider(0, 255, 0);
  colorSlider.position(10, height + 30);
  colorMode(HSB, 255);
  for(let i = 0;i <= 250; i++)
    {
      rainDrops.push(new rainDrop());
    }
    for(let i = 0;i <= random(1, 10); i++)
    {
        squares.push(new square());
    }
}
function keyPressed() {
  if (key === 'r' || key === 'R'){
    if (rainbowMode == false){
      rainbowMode = true;
  }
  else rainbowMode = false;
}
}


function draw() {
  background(20);
  
  if (rainbowMode == true){
    colorValue = colorValue + 1;
      if (colorValue > 255) {
        colorValue = 0; 
      }
  }
  else {
    colorValue = colorSlider.value();
  }
  
  

  for(let i = 0; i < rainDrops.length; i++)
  {
    rainDrops[i].color = color(colorValue, 255, 255);
    rainDrops[i].drawDrop();
    rainDrops[i].fall();

    if(rainDrops[i].hasHitMouse(mouseX,mouseY)){
      rainDrops[i].reset();
    }

    if (rainDrops[i].y > height)
    {
      rainDrops[i].reset();
    }
    for( let j = 0; j < squares.length; j++)
    {
      if (rainDrops[i].hasHitSquare(squares[j]))
      {
        rainDrops[i].reset();
        break;
      }
    }
  }
  for(let i = 0; i < squares.length; i++)
  {
    squares[i].drawSquare();
  }
  fill(0);
  ellipse(mouseX, mouseY, circleRad * 2, circleRad * 2);
}
class square{
  constructor(){
    this.x = random(0, width);
    this.y = random(0, height);
    this.xSize = random(50,100);
    this.ySize = random(50,100);
    
  }
  drawSquare() {
    stroke(0);
    fill(0);
    rect(this.x, this.y, this.xSize, this.ySize);
  }
}

class rainDrop {
  constructor() {
    this.x = random(- 100,width);
    this.y = random(-height,0);
    this.size = random(20,35);
    this.speed = random(10,18);
    // let blueColor = random(100, 200);
    // this.color = color(blueColor, blueColor, 255);
    this.color = color(0, 255, 255);
  }

  fall() {
    this.y = this.y + this.speed;
    this.x = this.x + 1;
  }

  drawDrop(){
    stroke(this.color);
    strokeWeight(2);
    line(this.x, this.y, this.x + 2, this.y + this.size);
  }

  reset()
  {
    // line(this.x, this.y + this.size, this.x + 10, this.y - 15);
    // line(this.x, this.y + this.size, this.x - 10, this.y - 15);
    line(this.x, this.y - 1, this.x + random(6,14), this.y - random(8,12));
    line(this.x, this.y - 1, this.x - random(6,14), this.y - random(8,12));
    this.x = random(startingX, width);
    this.y = 0;
    

  }
  hasHitSquare(square){
    return(this.x > square.x && this.x < square.x + square.xSize && this.y > square.y && this.y < square.y + square.ySize);
  }
  hasHitMouse(mouseX, mouseY){
    let distance = dist(this.x, this.y, mouseX, mouseY);
    return(distance < circleRad);
  }

}

