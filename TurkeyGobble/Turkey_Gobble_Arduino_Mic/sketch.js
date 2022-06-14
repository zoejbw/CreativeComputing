var serial;
var latestData = "waiting for data";
var brown1, brown2, brown3;
var red;
var yellow1;
var black;
var eyesize1, eyesize2, eyesize3;
var counting, gobbleCounting;
var data;
var threshold;
var isThereNoise, isSoundPlaying;
var checkOne, checkTwo, checkThree;
var sound;

function setup() {
  createCanvas(500, 300);

  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);

  sound = loadSound("TurkeyNoise.mp3");

  brown1 = color(155, 71, 29);
  brown2 = color(127, 62, 30);
  brown3 = color(104, 56, 32);

  red = color(175, 22, 45);
  yellow = color(229, 192, 68);
  black = color(0);

  eyeSize1 = 10;
  eyeSize2 = 10;
  eyeSize3 = 10;

  counting = 0;
  gobbleCounting = 0;

  noStroke();

  data = 0;
  threshold = 600;
  isSoundPlaying = false;
  isThereNoise = false;
  checkOne = false;
  checkTwo = false;
  checkThree = false;

}

function draw() {
  background(195, 240, 255);
  drawTurkeys();
  data = latestData;

  //****Uncomment below to test without Arduino*****
                //data = 900;

  checkForNoise();

  if (isThereNoise && !sound.isPlaying()) {
    sound.play();
  }

  if (sound.isPlaying()) {
    gobble();
  } else {
    dontGobble();
  }

}

function drawTurkeys() {
  blink();

  //left turkey
  fill(brown2);
  rect(100, 150, 30, 100);
  ellipse(100, 150, 80, 80);
  ellipse(150, 300, 180, 180);

  //right turkey
  fill(brown3);
  rect(340, 150, 30, 100);
  ellipse(370, 150, 80, 80);
  ellipse(350, 300, 180, 180);

  //middle turkey
  fill(brown1);
  rect(230, 150, 30, 100);
  ellipse(250, 150, 80, 80);
  ellipse(250, 300, 180, 180);

  //eyes
  fill(black);
  ellipse(250, 150, 10, eyeSize1);
  ellipse(370, 150, 10, eyeSize2);
  ellipse(100, 150, 10, eyeSize3);

  //tops of beaks
  fill(yellow);
  triangle(35, 150, 63, 135, 60, 150);
  triangle(280, 150, 280, 135, 300, 150);
  triangle(402, 150, 400, 135, 425, 150);

}

function blink() {

  if (counting > 50 && counting < 60) {
    eyeSize1 = 1;
  } else {
    eyeSize1 = 10;
  }
  if (counting > 100 && counting < 110) {
    eyeSize2 = 1;
  } else {
    eyeSize2 = 10;
  }
  if (counting > 170 && counting < 180) {
    eyeSize3 = 1;
  } else {
    eyeSize3 = 10;
  }
  if (counting > 200) {
    counting = 0;
  } else {
    counting++;
  }



};

function gobble() {
  if (gobbleCounting == 0 || gobbleCounting == 4 || gobbleCounting == 8 || gobbleCounting == 9) {
    y = -1;
  } else if (gobbleCounting == 1 || gobbleCounting == 2 || gobbleCounting == 6 || gobbleCounting == 7) {
    y = 2;
  } else if (gobbleCounting == 4 || gobbleCounting == 5) {
    y = 3;
  }

  //wattles
  fill(red);
  ellipse(280, 190 + y, 20, 50);
  ellipse(400, 190 + y, 20, 50);
  ellipse(65, 190 + y, 20, 50);

  //bottoms of beaks
  fill(yellow);
  triangle(35, 155 + y, 60, 155 + y, 65, 168 + y);
  triangle(280, 168 + y, 280, 155 + y, 300, 155 + y);
  triangle(400, 168 + y, 402, 155 + y, 425, 155 + y);

  if (gobbleCounting > 9) {
    gobbleCounting = 0;
  } else {
    gobbleCounting++;
  }
}

function dontGobble() {
  //wattles
  fill(red);
  ellipse(280, 190, 20, 50);
  ellipse(400, 190, 20, 50);
  ellipse(65, 190, 20, 50);

  //bottoms of beaks
  fill(yellow);
  triangle(35, 155, 60, 155, 65, 168);
  triangle(280, 168, 280, 155, 300, 155);
  triangle(400, 168, 402, 155, 425, 155);

}

function checkForNoise() {
  if (data > threshold && !checkOne) {
    checkOne = true;
  } else if (data > threshold && !checkTwo) {
    checkTwo = true;
  } else if (data > threshold && !checkThree) {
    checkThree = true;
  } else if (data <= threshold) {
    checkOne = false;
    checkTwo = false;
    checkThree = false;
  }
  isThereNoise = checkThree;
}