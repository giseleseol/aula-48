var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var bar
var topObstaclesGroup
var bottomObstaclesGroup
var barGroup
var gameState = play, play = 1, end=0;
var gameover, gameoverImg
var restart, restartImg
var score = 0;
var jumpSound
var dieSound


function preload(){
  bgImg = loadImage("assets/bg.png");
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");
  obsBottom1 = loadImage("assets/obsBottom1.png");
  obsBottom2 = loadImage("assets/obsBottom2.png");
  obsBottom3 = loadImage("assets/obsBottom3.png");
  gameoverImg = loadImage("assets/fimdejogo.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.mp3");
  dieSound = loadSound("assets/die.mp3");

}

function setup(){

  createCanvas(400,400)
//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3;

//criando canto superior e inferior
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;

      
//criando o balão      
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloonAnimation", balloonImg);
  balloon.scale = 0.2;

  gameover = createSprite(220,200);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;
  gameover.visible = false;

  restart = createSprite(220,240);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  topObstaclesGroup = new Group();
  bottomObstaclesGroup = new Group();
  barGroup = new Group();



}

function draw() {
  
  background("black");

  if(gameState == play){
       //fazendo o balão de ar quente pular

       if(keyDown("SPACE")){
        balloon.velocityY = -6;
        jumpSound.play();
      }
      
        //adicionando gravidade
        balloon.velocityY += 1;
      
     
      //gerando obstáculos no topo
      spawnObstaclesTop();
      Bar();
      spawnObstaclesBottom();

      if(balloon.isTouching(topGround) ||
      balloon.isTouching(bottomGround) ||
      topObstaclesGroup.isTouching(balloon)||
      bottomObstaclesGroup.isTouching(balloon)){
        gameState = end;
        dieSound.play();
      }

  }

  if(gameState == end){
    balloon.velocityX = 0;
    balloon.velocityY = 0;

    topObstaclesGroup.setVelocityXEach(0);
    bottomObstaclesGroup.setVelocityXEach(0);
    barGroup.setVelocityXEach(0);
    topObstaclesGroup.setLifetimeEach(-1);
    bottomObstaclesGroup.setLifetimeEach(-1);

    balloon.y = 200;
    gameover.visible = true;
    gameover.depth += 1;
    restart.visible = true;
    restart.depth += 1;

    if(mousePressedOver(restart)){
      restartGame();
    }


  }
    
          
   drawSprites();

   Score();
      
}

function restartGame(){
  gameState = play;
  gameover.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  score = 0;
}

function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1)
      obstacleTop.scale = 0.1;
      obstacleTop.velocityX = -4;
      
    //posições y aleatórias para os obstáculos do topo
       obstacleTop.y = Math.round(random(10,100));


    //gerar obstáculos aleatórios no topo
      var rand = Math.round(random(1,2));
      switch(rand){
        case 1: obstacleTop.addImage(obsTop1);
        break;
        case 2: obstacleTop.addImage(obsTop2);
        break;
        default: break;
      }
   
     //definir tempo de vida para a variável

     obstacleTop.lifetime = 100;

     balloon.depth += 1;

     topObstaclesGroup.add(obstacleTop);
  
      }
}

function spawnObstaclesBottom(){
  if(World.frameCount % 60 == 0){
    obstacleBottom = createSprite(400,350,40,50);
    obstacleBottom.addImage(obsBottom1);
    obstacleBottom.scale = 0.07;
    obstacleBottom.velocityX = -4;

    var numero = Math.round(random(1,3));

    switch(numero){
      case 1: obstacleBottom.addImage(obsBottom1);
      break;
      case 2: obstacleBottom.addImage(obsBottom2);
      break;
      case 3: obstacleBottom.addImage(obsBottom3);
      break;
      default: break;

    }

    obstacleBottom.lifetime = 100;
    balloon.depth += 1;

    bottomObstaclesGroup.add(obstacleBottom);

  }

 }

 function Bar() {
  if(World.frameCount % 60 === 0) {
  bar = createSprite(400,200,10,800);
  bar.velocityX = -6;
  bar.depth = balloon.depth;
  bar.lifetime = 400/6;
  bar.visible = false;
  barGroup.add(bar);
}
}

function Score(){
  if(barGroup.isTouching(balloon)){
    score += 5;
  }
  fill("black");
  textSize(20);
  textFont("algerian");
  text("Pontuação: " + score, 250, 50);

}


  
