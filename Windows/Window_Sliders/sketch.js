var slider;
var sliderVal;
var slider2;
var slider2Val;

var lightOn;
var lightRoom;
var darkRoom;
var twinkle;
var y;

function setup() {
  createCanvas(500, 500);
  slider = createSlider(0, 100, 10);
  slider.position(200, 450);
  
  slider2 = createSlider(0, 100, 10);
  slider2.position(200, 420);

  lightOn = true;
  lightRoom= color(210, 210, 180);
  darkRoom = color(40,40,40);
  twinkle = 0;
  y = 0;

}

function draw() {
  sliderVal = slider.value();
  slider2Val = slider2.value();

  drawSky();
  drawClouds();
  drawWindow();  
 

}

function drawSky(){
  noStroke();
  
  //background
  var x2 = sliderVal*2;
  background(145-x2, 187-x2, 255-x2);

  //stars
  drawStars();
 
  //sun and moon
  var x6 = sliderVal*6;  
  fill(255, 242, 160);
  ellipse(150, 100+x6, 70, 70);
  fill(90);
  ellipse(350, 750-x6, 70, 70);
  
  
  
 
}

function drawStars(){
  getTwinkle();
  var size = 5 + twinkle;
  var size2 = 5 - twinkle;

  var tranparency = (sliderVal*3)-100;
  fill(255,255,255,tranparency);
  
  ellipse(200, 100, size2, size2);
  ellipse(300, 120, size, size);
  ellipse(210, 320, size2, size2);
  ellipse(120, 270, size, size);
  ellipse(340, 240, size2, size2);
  ellipse(200, 200, size2, size2);
  ellipse(200, 100, size, size);
  ellipse(300, 120, size, size);
  ellipse(120, 120, size2, size2);
  ellipse(90, 170, size, size);
  ellipse(380, 320, size2, size2);
  
  ellipse(230, 90, size-2, size-2);
  ellipse(230, 190, size-2, size-2);
  ellipse(430, 230, size-2, size-2);
  ellipse(330, 60, size-2, size-2);
  ellipse(220, 340, size-2, size-2);
  ellipse(80, 320, size-2, size-2);
  ellipse(250, 280, size-2, size-2);

  
}

function drawClouds(){
 
 fill(255-sliderVal*1.5, 255-sliderVal*1.5, 255-sliderVal*1.5);
  
 leftX = -20+slider2Val;
 leftY = -20+ slider2Val/2 ;
 rightX = 600-(slider2Val*1.75);
 rightY = 280-slider2Val/5;
  
 //left cloud 
 ellipse(leftX,leftY,80,80);
 ellipse(leftX+60,leftY+10,70,70);
 ellipse(leftX+90,leftY+30,40,40);
 ellipse(leftX-30,leftY+30,90,90);
 ellipse(leftX+30,leftY+50,60,60);
 ellipse(leftX+70,leftY+50,30,30);
 ellipse(leftX-10,leftY+70,80,80);
 ellipse(leftX-40,leftY+100,70,70);
  
 //right cloud
 ellipse(rightX,rightY,80,80);
 ellipse(rightX-40,rightY-20,60,60);
 ellipse(rightX-80,rightY-0,40,40);
 ellipse(rightX-100,rightY+20,30,30);
 ellipse(rightX-70,rightY+30,45,45);
 ellipse(rightX-30,rightY+20,70,70);
 ellipse(rightX+30,rightY+20,90,90);
 ellipse(rightX+40,rightY-20,40,40);






  



}

function getTwinkle(){
  
if(y < 10){twinkle = 0;}
  else if(y < 20){twinkle = 1;}
  else if(y < 30){twinkle = 2;}
  else if(y < 40){twinkle = 1;}
  else  {y = 0;}
  y++;

}

function drawWindow(){
  


  
  if(lightOn){fill(lightRoom);}else{fill(darkRoom);}

  rect(0,0,500,50);
  rect(0,0,50,500);
  rect(450,0,50,500);
  rect(0,350,500,500);
  rect(245,0,10,500);
  rect(0,200,500,10);
  
  if(lightOn){
     fill(255,255,255,15);
     quad(180, 50, 220, 50, 140, 200, 100, 200);
     quad(380, 50, 420, 50, 340, 200, 300, 200);
     quad(180, 210, 220, 210, 140, 350, 100, 350);
     quad(380, 210, 420, 210, 340, 350, 300, 350);
 }
  
    if(lightOn){fill(230, 230, 200);}else{fill(50);}
  
    rect(10,250,30,50);
  
    if(lightOn){fill(240, 240, 210);}else{fill(darkRoom);}
  
    ellipse(25,255,3,3);
    ellipse(25,295,3,3);
    rect(17,260,16,30);
  
    if(lightOn){fill(210, 210, 180);}else{fill(55);}
  
    rect(17,260,16,15);
  
  
}

function mouseClicked(){
if(mouseX > 17 && mouseX < 33 && mouseY > 260 && mouseY < 295){
lightOn = !lightOn;}
}

