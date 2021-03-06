var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Monkey, monkey_running, monkey_collided;
var banana, bananaImg, bananaG;
var rock, rockImg, rockG;
var bgImg;
var ground, groundImg, invG;


var survival = 0;
var bananaeat = 0;


function preload() {


  bgImg = loadImage("bg1j.jpg")

  groundImg = loadImage("g1.jpg")

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  monkey_collided = loadAnimation("sprite_2.png")

  bananaImg = loadImage("ban.jpg");
  rockImg = loadImage("sto-1.jpg");

}



function setup() {
  createCanvas(windowWidth, windowHeight)


  Monkey = createSprite(width-1400, height-200);
  Monkey.addAnimation("monkey_running", monkey_running);
  Monkey.addAnimation("monkey_collided", monkey_collided);
  Monkey.scale = 0.12;
  Monkey.debug = false;

  ground = createSprite(200, 860);
  ground.addImage(groundImg);
  ground.scale = 1.9;
  ground.x = ground.width / 2;
  ground.depth = Monkey.depth;
  Monkey.depth = Monkey.depth + 1;


  invG = createSprite(700, 555, width, 10)
  invG.visible = false


  rockG = new Group();
  bananaG = new Group();

}


function draw() {
  background(bgImg)

  if (gameState === PLAY) {

    ban();
    rock();

    ground.velocityX = -(6 + 4 * survival / 100)

    if (touches.length>0||(keyDown("space")) && Monkey.y >= 100) {
      Monkey.velocityY = -6
      touches=[]

    }
   /* if (mousePressedOver(Monkey)) {
      
      Monkey.velocityY = -8
      
    }*/

    Monkey.velocityY = Monkey.velocityY + 0.8

    if (ground.x < 100) {
      ground.x = ground.width / 2
    }

    if (bananaG.isTouching(Monkey)) {
      bananaG.destroyEach();
      bananaeat = bananaeat + 1
    }


    if (rockG.isTouching(Monkey)) {
      gameState = END;
    }

  } else if (gameState === END) {

    Monkey.velocityY = Monkey.velocityY + 0.8


    Monkey.changeAnimation("monkey_collided", monkey_collided)


    ground.velocityX = 0;
    survival = 0;
    bananaeat = 0;

    rockG.setVelocityXEach(0);
    bananaG.setVelocityXEach(0);


    rockG.setLifetimeEach(-1);
    bananaG.setLifetimeEach(-1);
  }




  Monkey.collide(invG);










 
  drawSprites();


  fill("black")
  textSize(20)
  text("Survival:" + survival, 50, 50);
  survival = survival + Math.round(getFrameRate() / 60)

  text("Banana Eat=" + bananaeat,width-200, 50)

}

function rock() {
  if (frameCount % 190 === 0) {
    var rock = createSprite(800, 510)
    rock.addImage(rockImg)
    rock.scale = 0.4;
    rock.velocityX = ground.velocityX
    rock.lifeTime = 200
    rock.debug = false;
    rock.setCollider("rectangle", 10, 30, 350, 300)


    rockG.add(rock);
  }
}

function ban() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(800, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = ground.velocityX;
    banana.y = Math.round(random(260, 310))
    banana.lifeTime = 200



    bananaG.add(banana);
  }
}