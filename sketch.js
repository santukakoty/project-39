var roadImage,mainPlayerImages,opponentImage,opponentPlayer;
var END=0;
var PLAY=1;
var gameState=PLAY;
var gameOver;
var reset;
var distance=0;
var bushes; 

function preload(){
roadImage=loadImage("images/Road.png");
mainPlayerImage1=loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
mainPlayerImage2=loadAnimation("images/mainPlayer3.png");
opponentImage1=loadAnimation("opponent4.png","opponent5.png");
opponentImage2=loadAnimation("opponent6.png");
gameOverImage=loadImage("gameOver.png");
bushesImage=loadImage("images/bushes.png");
}
function setup(){
createCanvas(1000,500);

road=createSprite(500,230);
road.addImage(roadImage);
//road.scale=5;
road.velocity.x=-5;

gameOver = createSprite(500,150);
  gameOver.addImage(gameOverImage)

mainPlayer  = createSprite(70,150,20,20);
mainPlayer.addAnimation("SahilRunning",mainPlayerImage1);
mainPlayer.scale=0.09;
  //mainPlayer.debug=true;
  mainPlayer.setCollider("rectangle",0,0,40,40);
  opponentgroup = new Group();
  bushesgroup = new Group();
}
function draw(){
background(0);

drawSprites(); 

textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);

if(gameState===PLAY){
  road.velocityX = -5;
  if(road.x<0){
    road.x=width/2
  }
  gameOver.visible=false;
  distance = distance+Math.round(getFrameRate()/10)
  mainPlayer.y = World.mouseY;
  opponent();
  bushes();
  if(mainPlayer.isTouching(opponentgroup)){
    gameState=END;
    
  }
}
if(gameState===END){
  road.velocityX=0;
      mainPlayer.velocityY=0;
      
    opponentPlayer.addAnimation("oppo",opponentImage2);
    mainPlayer.addAnimation("SahilRunning",mainPlayerImage2);
    opponentgroup.setVelocityXEach(0);
    bushesgroup.setVelocityXEach(0)
    opponentgroup.setLifetimeEach(-1);
    gameOver.visible=true;
    textSize(28);
    fill("yellow");
    text("Press R to restart",400,200);
    if(keyDown("R")){
      reset();
    }
  }

}
function opponent(){
if(frameCount%200===0){
  opponentPlayer=createSprite(900,Math.round(random(50,250)))
  opponentPlayer.addAnimation("oppo",opponentImage1);
  opponentPlayer.velocityX=-4;
  opponentPlayer.scale=0.08;
  opponentgroup.add(opponentPlayer);
  opponentPlayer.setLifetime=50;
}
}
function reset(){
  distance =0;
  gameState = PLAY;
  opponentgroup.destroyEach();
  mainPlayer.addAnimation("SahilRunning",mainPlayerImage1);
}
function bushes(){
  if(frameCount%50===0){
    b=createSprite(1000,Math.round(random(20)))
    b.addImage("bu",bushesImage);
    b.velocityX= -5;
    b.scale=0.7;
    bushesgroup.add(b);
    //b.setLifetime=30;
  }
}