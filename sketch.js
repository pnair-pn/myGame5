var bgImage, bg, obstaclesGroup, obstacleImage, coinGroup, coinImage;
var player, player_running, ground, restart, jumpSound, collideSound;

var score = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
bgImage = loadImage("images/Imported piskel.gif");
obstacleImage = loadImage("images/hurdle.png");
coinImage = loadImage("images/medal.png");
jumpSound = loadSound("jump.wav");
player_running = loadAnimation("images/runnerboy.png", "images/runnerboy-1.png", "images/runnerboy-3.png", "images/runnerboy-2.png");
}

function setup(){
var canvas = createCanvas(800, 400);

jumpSound.loop();

bg = createSprite(500,200,800,400);
bg.addImage(bgImage);
bg.scale = 3.7;
bg.x=bg.width/2;
bg.velocityX=-4;

player = createSprite(100, 320, 100, 100);
player.debug = true;
player.addAnimation("running",player_running);

ground = createSprite(100,400,800,40);
ground.visible = false;

restart = createSprite(300,140);
restart.visible = false;

obstaclesGroup = new Group();
coinGroup = new Group();

score = 0;
}

function draw(){
background(0);



if (gameState === PLAY){
  
  
if(bg.x<200){
    bg.x=bg.width/2; 
  }
 

  if (keyDown("space") && player.y > 275){
    jumpSound.play();
    player.velocityY = -18;
    
  }
  if (keyDown("UP_ARROW") && player.y > 275){
    jumpSound.play();
    player.velocityY = -18;
    
  }

  if (coinGroup.isTouching(player)){
    coinGroup.destroyEach();
    score = score + 20;
  }
  
  player.velocityY = player.velocityY + 0.8;

  player.collide(ground);

  if (obstaclesGroup.isTouching(player)){
    gameState = END;
  }

  spawnObstacles();
  spawnCoins();
  drawSprites();
  strokeWeight(3)
stroke(0);
textSize(20);
fill(255);
text("Score: "+ score, 50,50);
  }

  if (gameState === END){
    background(255);
    strokeWeight(3);
    stroke("black");
    textSize(40);
    fill("red");
    text("GAME OVER!", 400, 200);
    restart.visible = true;

    player.destroyEach();
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();

    drawSprites();
  }
}

function spawnObstacles(){
  if (frameCount % 120 === 0) {
    var hurdle = createSprite(800,320,100,100);
    hurdle.debug = true;
    hurdle.addImage(obstacleImage);
    hurdle.scale = 0.25;
    hurdle.velocityX = -9;
    hurdle.lifetime = 400;
    obstaclesGroup.add(hurdle);
  }
}

function spawnCoins(){
  if (frameCount % 180 === 0) {
    var coin = createSprite(800,120,100,100);
    coin.y = Math.round(random(80,120));
    coin.addImage(coinImage);
    coin.scale = 0.05;
    coin.velocityX = -9;
    coin.lifetime = 400;
    coinGroup.add(coin)
}

}