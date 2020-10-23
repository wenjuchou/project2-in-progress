
let canvas;
let bg = [];
let gameOver = false;
let gameStart;
let score;
let bomb;
let dart;
let ninja;
let ninjaAnimR;
let ninjaAnimL;

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;


function preload() {
  const NinjaRSpriteSheet = loadSpriteSheet("img/NinjaR.png", 64, 64, 6);
  const NinjaLSpriteSheet = loadSpriteSheet("img/NinjaL.png", 64, 64, 6);
  ninjaAnimR = loadAnimation(NinjaRSpriteSheet);
  ninjaAnimL = loadAnimation(NinjaLSpriteSheet);
  ninja = createSprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 6, 64, 64);
  ninja.moveSpeed = 6;
}

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  bg = loadImage('img/background.png');
  ninja.addAnimation("moveR", ninjaAnimR);
  ninja.addAnimation("moveL", ninjaAnimL);
  ninja.addImage("still", loadImage("img/Ninja-1.png"));
  ninja.setDefaultCollider()
  gameStart = createButton('press space key to start the game');
}


function update(object) {
  if (keyDown("left") || keyDown("right")) {
    if (keyDown("left")) {
      object.addSpeed(2, 180);
      object.mirrorX(-1);
    }
    if (keyDown("right")) {
      object.addSpeed(2, 0);
      object.mirrorX(1);
    }
  } else {
    object.setSpeed(0);
  }
  drawObject(object);
}

function drawObject(object) {
  if (object.getSpeed() > 0.0001) {
    object.changeAnimation("moveR");
  } else {
    object.changeImage("still");
  }
  ninja.limitSpeed(ninja.moveSpeed);
  drawSprite(object);
}

function draw() {
  background(bg);
  update(ninja);

  if(!gameOver){
    drawGame();
  } else {
    background(0)
    drawGameOver();
  }
}
