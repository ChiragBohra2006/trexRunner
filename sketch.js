var trex, runningTrex, collidedTrex;
var edges;
var ground, groundImage, invisibleGround;
var cloud, cloudImage, cloudGroup;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var gameOver, gameOverImage;
var checkPointSound, jumpSound, dieSound;



function preload()
{

  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
  runningTrex = loadAnimation("trex1.png","trex3.png","trex4.png");

collidedTrex = loadAnimation ("trex_collided.png");
  
groundImage = loadImage ("ground2.png");
  
cloudImage = loadImage ("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  checkPointSound = loadSound("checkPoint.mp3");
  
  dieSound = loadSound("die.mp3");
  
  jumpSound = loadSound("jump.mp3");
  
}

function setup()
{
  createCanvas(600,200);
  
  trex = createSprite(40,150,20,50);
  trex.addAnimation("running Trex",runningTrex);
  trex.addAnimation("trexCollided", collidedTrex);
  trex.scale = 0.5
  trex.setCollider("circle", 0, 0, 40);
  
  
  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = false;
  
  ground = createSprite(300, 175, 600, 10);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  
  gameOver = createSprite(300, 100);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 0.7;
  gameOver.visible = false;
  
  restart = createSprite(300, 160);
  restart.addImage("restart", restartImage);
  restart.scale = 0.7;
  restart.visible = false;
  
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
}

function draw()
{
  
  background("white");
  fill("black");
  text("SCORE:" +score , 500, 25);

  
  if(gameState === PLAY)
    {
     ground.velocityX = -(3+score/200);
     
     score = score+Math.round(getFrameRate()/30);
      
     if(score>0 && score % 200 === 0)
       {
         checkPointSound.play();
       }
     
       
  if(keyDown ("space") && trex.y>164)
    {
      jumpSound.play();
      trex.velocityY = -12;
    }
  trex.velocityY = trex.velocityY + 0.8;
      
  if(ground.x < 0)
  {
   ground.x = ground.width/2;
  }
  
  spawnClouds();
  
  spawnObstacle();
      
      if(obstacleGroup.isTouching(trex))
        {
          dieSound.play();
          gameState = END;
          
        }
    }
  else if(gameState === END)
    {
     ground.velocityX = 0;
     trex.changeAnimation("trexCollided", collidedTrex);
     trex.velocityY = 0;
     
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
      
     cloudGroup.setVelocityXEach(0);
     cloudGroup.setLifetimeEach(-1);
      
      gameOver.visible = true;
      
      restart.visible = true;
      
      if(mousePressedOver(restart))
        {
          resetGame();
        }
      }
  
  
 
 
  
  
  trex.collide(invisibleGround);
  

  
  drawSprites();
    
  
}

function spawnClouds()
{
  if(frameCount % 100 === 0)
    {
      cloud = createSprite(600, 50, 50, 20);
      cloud.addImage("cloud", cloudImage);
      cloud.scale = 0.7
      cloud.velocityX = -(2+score/200);
      cloud.y = Math.round(random(20,80));
      trex.depth = cloud.depth+1;  
      cloud.lifetime = 315;
      
      cloudGroup.add(cloud);
    }
  
  
  
}

function spawnObstacle()
{
  if(frameCount % 100 === 0)
{
  obstacle = createSprite(600, 160, 20, 50)
  obstacle.velocityX = -(5+score/200);
  
  
  num = Math.round(random(1, 6))
  switch(num)
    {
      case 1: obstacle.addImage("obstacleImage", obstacle1)
      break;
      
      case 2: obstacle.addImage("obstacleImage", obstacle2)
      break;
      
      case 3: obstacle.addImage("obstacleImage", obstacle3)
      break;
      
      case 4: obstacle.addImage("obstacleImage", obstacle4)
      break;
      
      case 5: obstacle.addImage("obstacleImage", obstacle5)
      break;
      
      case 6: obstacle.addImage("obstacleImage", obstacle6)
      break;
      
      default: break;
    }
  
  obstacle.scale = 0.5;
  
  obstacle.lifetime = 350;
  
  obstacleGroup.add(obstacle);
}    
}

function resetGame()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running Trex",runningTrex);
  score = 0;
  
}