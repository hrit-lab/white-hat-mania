
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var database;
var bg1,bg2;
var whiteHat, whiteHatImg, blueHat,blueHatImg,brownHat,brownHatImg,greenHat,greenHatImg,orangeHat,orangeHatImg,purpleHat,purpleHatImg,redHat,redHatImg,yellowHat,yellowHatImg;
var child,childImg;
var gameOver,gameOverImg;
var ground;
var stoneImg;
var gameOverSound;
var victorySound,gameSound;
var invisibleGround;
var score = 0;

function preload(){
 bg1 = loadImage("bg1.jpg");
 bg2 = loadImage("bg2.jpg");
 childImg = loadImage("child.png");
 blueHatImg = loadImage("blue hat.png")
 brownHatImg = loadImage("brown hat.png");
orangeHatImg = loadImage("orange hat.png");
purpleHatImg = loadImage("purple hat.png");
redHatImg = loadImage("red hat.png");
  yellowHatImg = loadImage("yellow hat.png");
  whiteHatImg = loadImage("white hat.png");
  gameOverImg = loadImage("gameOverImg.jpg");
  stoneImg = loadImage("stone.png");
 gameOverSound = loadSound("gameOver.wav");
 gameSound = loadSound("game.mp3");
 victorySound = loadSound("victory.mp3");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,500);

  child = createSprite(140,360);
  child.addImage(childImg);
  child.scale = 0.5;

  
  ground = createSprite(500,420,1500,10);
  ground.x = ground.width/2;
  ground.visible = false;

  invisibleGround = createSprite(500,390,1000,10);
  invisibleGround.visible = false;

  gameOver = createSprite(500,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;

  obstaclesGroup = createGroup();
  HatsGroup = createGroup();
  score = 0;
}

function draw() {
 background(bg1);
  fill(0);
  noStroke();
  textSize(10);
  text("Score: "+ score, 230,20);
  child.collide(invisibleGround);
  if(gameState === PLAY){
   // gameSound.play();
    gameOver.visible = false;
    ground.velocityX = -(4 + 3* score/100) 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && child.y >= 100){
        child.velocityY = -12;
    }
    child.velocityY = child.velocityY + 0.8;
    spawnObstacles();
    spawnHats();
    if(HatsGroup.isTouching(child)){
      score = score + 1;
      HatsGroup.destroyEach();
      victorySound.play();
    }
    if(obstaclesGroup.isTouching(child)){
        gameState = END;
        gameOverSound.play();
       gameOver.visible = true;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
      child.velocityX = 0;   
    obstaclesGroup.setLifetimeEach(-1);   
     obstaclesGroup.setVelocityXEach(0);
     HatsGroup.setLifetimeEach(-1);   
     HatsGroup.setVelocityXEach(0);
   }
   drawSprites();
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(1000,370);
   obstacle.addImage(stoneImg);
   obstacle.scale = 0.2;
   obstacle.velocityX = -(6 + score/100);  
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}
function spawnHats(){
  if(frameCount === 200){
    blueHat = createSprite(1000,400);
    blueHat.addImage(blueHatImg);
    blueHat.scale = 0.5;
    blueHat.velocityX = -6;
    blueHat.lifetime = 300
    HatsGroup.add(blueHat);}

    if(frameCount === 400){
    brownHat = createSprite(1000,400);
    brownHat.addImage(brownHatImg);
    brownHat.velocityX = -6;
    brownHat.scale = 0.5;
    brownHat.lifetime = 300;
    HatsGroup.add(brownHat);}

    if(frameCount === 550){
    orangeHat = createSprite(1000,400);
    orangeHat.addImage(orangeHatImg);
    orangeHat.velocityX  = -6;
    orangeHat.scale = 0.5;
    orangeHat.lifetime = 300;
    HatsGroup.add(orangeHat);}

    if(frameCount === 800){
    redHat = createSprite(1000,400);
    redHat.addImage(redHatImg);
    redHat.velocityX = -6;
    redHat.scale = 0.5;
    redHat.lifetime = 300;
    HatsGroup.add(redHat);}

    if(frameCount === 1000){
      yellowHat = createSprite(1000,400);
      yellowHat.addImage(yellowHatImg);
      yellowHat.velocityX = -6;
      yellowHat.scale = 0.5;
      yellowHat.lifetime = 300;
      HatsGroup.add(yellowHat);
    }

    if(frameCount === 1150){
      purpleHat = createSprite(1000,400);
      purpleHat.addImage(purpleHatImg);
      purpleHat.velocityX = -6;
     purpleHat.scale = 0.5;
      purpleHat.lifetime = 300;
      HatsGroup.add(purpleHat);
    }

    if(frameCount === 1400){
      whiteHat = createSprite(1000,400);
      whiteHat.addImage(whiteHatImg);
      whiteHat.velocityX = -6;
      whiteHat.scale = 0.5;
      whiteHat.lifetime = 300;
      HatsGroup.add(whiteHat);
    }
}
