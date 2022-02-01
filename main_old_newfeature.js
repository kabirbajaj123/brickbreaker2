


canvas = document.getElementById("myCanvas");
l = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720;

var x = 480, radius = 15;
var y=600;
var sizex=100;
var sizey=20;
var score = 0;
var lives=3;
var counter1=0;
var counter2=0;
var brokenBrick = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
];
var brickTouched = 0;
var e = window.event;
var speed=2;
var velocity = {x:0, y:-0};
var position = {x:x + 0, y:y - 50};
var initializeOnlyOnce = false;


function setLevel(){
   var level = prompt("Select Level (Easy, Normal, Hard)", "Hard");

  if (level == "Easy") {
    speed = 1;
 
  }
  if (level == "Normal") {
    speed = 2;
  }
  if (level == "Hard") {
    speed = 3;
  }
  if (level == "Devil") {
    speed = 4;
  }

}



function getScore(){
  score = 0;
  for (var p = 0; p <= 3; p++){
    for (var q = 0; q <= 8; q++){
      score += brokenBrick[p][q];
    }
  }
}
function playerCollisionLogic(){

  if (position.x + radius >= x - 10 && position.x + radius <= x + 100 + 10){
    if (position.y + radius >= y-10 && position.y-radius <= y+ 10) {
      if(position.y<y-10){
      velocity.y=-Math.abs(velocity.y);
      velocity.x += Math.random()*0.2 - 0.1;
      }
      if(position.y>y+10){
        velocity.y=Math.abs(velocity.y);
        velocity.x += Math.random()*0.2 - 0.1;
      }
     }
    }

}


function wallCollisionLogic(){
  if (position.x + radius >= canvas.width) {
    velocity.x *= -1;
    velocity.y += Math.random()*0.1 - 0.05;
  }
  if (position.x - radius <= 0) {
    velocity.x *= -1;
    velocity.y += Math.random()*0.1 - 0.05;
  }
  if (position.y + radius >= canvas.height) {
    velocity.y *= -1;
    velocity.x += Math.random()*0.1 - 0.05;
  }
  if (position.y - radius <= 0) {
    velocity.y *= -1;
    velocity.x += Math.random()*0.1 - 0.05;
  }
}

function brickCollisionLogic(brickX, brickY, sizeX, sizeY,){
  var i=(brickX-200)/82;
  var j=(brickY-150)/42;
  if (position.x + radius >= brickX && position.x - radius <= brickX + sizeX) {
    if (position.y + radius >= brickY && position.y - radius <= brickY + sizeY){
      brickTouched = 1;
 
      if (position.x < brickX || position.x > brickX + sizeX) {
        
        velocity.x *= -1.05;
        
      
        
      }

      
       else if (position.y < brickY || position.y > brickY + sizeY) {
       
        velocity.y *= -1.05;
        

      }
     
    
    }
    if(brickTouched==1){ //increase ball speed on collision with this block
      if(j==3 && i==3){
        velocity.x*=2;
        velocity.y*=2;
      }

      if(j==3 && i==7){ //decrease ball speed on collision with this block
        velocity.x*=0.5;
        velocity.y*=0.5;
      }
       if(j==2 && i==1){ // shorten paddle
      sizex=50;

      }
      if(j==2 && i==5){ // lengthen  paddle
        sizex=150;
        }
      if(j==1 && i==3){
       lives=lives+1; //increase lives

      }
      if(j==1 && i==7){
        lives=lives-1; //decrease lives
      }
      if(j==0 && i==1){
        counter1=counter1+1;
      }
      if(j==0 && i==5){
        counter2=counter2+1;
      }
  
    }
  }
}


function update() {
    console.log(velocity)
    console.log(y, initializeOnlyOnce)
    //Playing Area

    l.fillStyle = "#120052";
    l.beginPath();
    l.rect(0,0,canvas.width,canvas.height);
    l.fill();
    l.closePath();

    l.fillStyle = "#ff2281";
    l.beginPath();
    l.rect(0, canvas.height - 10, canvas.width, canvas.height);
    l.fill();
    l.closePath();

    //Player

    l.fillStyle ="#ffffff";
    l.beginPath();
    l.rect(x,y,sizex,sizey);
    l.fill();
    l.closePath();

    //Bricks
    for (var j = 0;j <= 3; j++){
      
      for (var i = 0; i <= 8; i++){
        if (brokenBrick[j][i] == 0){
          j == 0 && i!=1 && i!=5? l.fillStyle = "#b537f2" : console.log();
          j == 0 && i==1? l.fillStyle = "#ff0000" : console.log();
          j == 0 && i==5? l.fillStyle = "#ff0000" : console.log();

      j == 1 && i!=3 && i!=7? l.fillStyle = "#3cb9f2" : console.log();
      j==1 && i==3 ? l.fillStyle = "#ff0000" : console.log();
      j==1 && i==7 ? l.fillStyle = "#ff0000" : console.log();
      j == 2 && i!=1 && i!=5? l.fillStyle = "#09fbd3" : console.log();
      j==2 && i==1 ? l.fillStyle = "#ff0000" : console.log();
      j==2 && i==5 ? l.fillStyle = "#ff0000" : console.log();
      j == 3 && i!=3  && i!=7? l.fillStyle = "#f5d300" : console.log();
      j == 3 && i==3 ? l.fillStyle = "#ff0000" : console.log();
      j == 3 && i==7 ? l.fillStyle = "#ff0000" : console.log();
          brickTouched = 0;
          brickCollisionLogic(200 + 82*i,150 + 42*j,80,40);
          l.beginPath();
          l.rect(200 + 82*i,150 + 42*j,80,40);
          l.fill();
          l.stroke();
          l.closePath();
        }
        if (brickTouched == 1 ){
         
            brokenBrick[j][i] = 1;
        }
         if(j==0 && i==1 && counter1<3 && brickTouched==1){
          brokenBrick[j][i] = 0;
          
         }
         if(j==0 && i==1 && counter1==3&& brickTouched==1){
          brokenBrick[j][i] = 1;
         
         }
         if(j==0 && i==5 && counter2<3 && brickTouched==1){
          brokenBrick[j][i] = 0;
          
         }
         if(j==0 && i==5 && counter2==3&& brickTouched==1){
          brokenBrick[j][i] = 1;
         
         }
        




    }
      
      l.font = "30px Arial";
      l.fillText("SCORE", 800, 50);
      l.fillText(score, 1000, 50);
      l.fillText("LIFE",800,100);
      l.fillText(lives,1000,100);

    }
    //Ball
    playerCollisionLogic();
    wallCollisionLogic();
    if (initializeOnlyOnce){
      position.x += velocity.x; //Normal behaviour
      position.y += velocity.y;
    }

    if (!initializeOnlyOnce){
      position = {x:x + 0, y:y - 50}; //Initial Behaviour : follow the player
    }

    l.fillStyle = "#ffffff";
    l.beginPath();
    l.arc(position.x, position.y, radius, 0, Math.PI*2, false);
    l.fill();
    l.closePath();

    if (y >= 630 && initializeOnlyOnce == false){
      velocity.x = speed;
      velocity.y = -speed;
   
      initializeOnlyOnce = true;
    }
};

var alert_only_once = 0;
function gameOverCheck() {
  if (position.y + radius >= canvas.height) {
    lives =lives-1;
    if(lives==0){
      alert("Game Over!");
      position.x = -100;
      position.y = -100;
    }
    }
    if (score >= 36 && alert_only_once == 0  )
    {
        alert("You Win!");
        
        alert_only_once=1;
    }
  }

var tempVelocityX  = 0, tempVelocityY = 0;

onmousemove = function(e){

  x = e.clientX - 60;
  
if(y<680 && y>=400){
   y =e.clientY -10; //move paddle in y direction
}
if(y<400){
y=405;
}
if(y>=680){
y=675;

}






};
var mymod = 1;
onkeydown = function(e){
  if (e.key == 'p'){
    if (mymod > 0){
      tempVelocityX = velocity.x;
      tempVelocityY = velocity.y;
      velocity.x = velocity.y = 0;
    }
    else{
      velocity.x = tempVelocityX;
      velocity.y = tempVelocityY;
    }
    mymod *= -1
  }
};

setLevel();
setInterval(gameOverCheck, 1);
setInterval(getScore, 1);
setInterval(update, 1);
gameOverCheck();
getScore();
update(e);

