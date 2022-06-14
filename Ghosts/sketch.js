var myGhosts = [];
var myPeople = [];
var ghostNoise;
var CanvasX;
var CanvasY;
var numPeople;

function setup() {
  noStroke();
  CanvasX = windowWidth;
  CanvasY = windowHeight;
  createCanvas(CanvasX, CanvasY);
  ghostNoise = loadSound('GHOSTLY.mp3');
  numPeople = Math.floor((CanvasX + 10) / 100);

  for (var i = 0; i < numPeople; i++) {
    myPeople.push(new Person(i));
  }
}

function draw() {

  background(0);

  for (var i = 0; i < myPeople.length; i++) {
    myPeople[i].display();
  }

  for (var j = 0; j < myGhosts.length; j++) {
    myGhosts[j].fly();
  }

}

function mousePressed() {
  for (var i = myPeople.length - 1; i > -1; i--) {
    if (myPeople[i].doIdie()) {
      myPeople[i].makeGhost();
      var pos = myPeople[i].getPosition();
      myPeople.splice(i, 1);
      myPeople.push(new Person(pos));
    }
  }
}

class Person {

  constructor(p) {
    this.position = p;
    this.maxHeight = windowHeight - (450 + random(70));
    this.height = windowHeight / 2;
    this.eyesize = 10;
    this.blinktime = random(190);
    this.count = 0;
    this.shirtColor = color(random(55), random(55), random(55));
    this.skinColor = color(140 + random(70), 110 + random(40), 70 + random(40));
  }

  display() {
    this.blink();

    fill(this.shirtColor);
    rect((this.position * 100) + 10, 450 + this.height, 80, 80);
    ellipse((this.position * 100) + 50, 450 + this.height, 80, 50);

    fill(this.skinColor);
    rect((this.position * 100) + 38, 410 + this.height, 25, 20);
    ellipse((this.position * 100) + 50, 380 + this.height, 60, 70);
    ellipse((this.position * 100) + 20, 380 + this.height, 10, 20);
    ellipse((this.position * 100) + 80, 380 + this.height, 10, 20);
    ellipse((this.position * 100) + 51, 430 + this.height, 25, 10);

    if (this.height > this.maxHeight) {
      this.height--;
    }

     fill(0);
    if (this.doIdie()) {
      ellipse((this.position * 100) + 40, 380 + this.height, 8, 13);
      ellipse((this.position * 100) + 60, 380 + this.height, 8, 13);
      ellipse((this.position * 100) + 50, 398 + this.height, 8, 13);
      
    } else {
    ellipse((this.position * 100) + 40, 380 + this.height, 8, this.eyesize);
    ellipse((this.position * 100) + 60, 380 + this.height, 8, this.eyesize);
      rect((this.position * 100) + 40, 395 + this.height, 20, 2);
    }

  }

  blink() {
    if (this.count > this.blinktime && this.count < this.blinktime + 10) {
      this.eyesize = 2;
    } else {
      this.eyesize = 10;
    }
    if (this.count > 200) {
      this.count = 0;
    } else {
      this.count++;
    }

  }

  doIdie() {
    if (mouseX > (this.position * 100) + 10 && mouseX < (this.position * 100) + 90 && mouseY > 340 + this.height) {
      return true;
    } else {
      return false;
    }
  }


  makeGhost() {
    myGhosts.push(new Ghost((this.position * 100) + 50, 380 + this.height));
    ghostNoise.play();
  }

  getPosition() {
    return this.position
  }

}

class Ghost {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = 220 + random(35);
    this.eye = 5;
    this.xspeed = ((random(4) - 2) * 2) + 1;
    if (this.xspeed < 0) {
      this.eye = -this.eye;
    }
    this.yspeed = ((random(4) - 2) * 2) + 1;
    this.r = 20 + random(10);
    this.eyesize = 2;
    this.blinktime = random(190);
    this.count = 0;

  }

  fly() {

    this.blink();

    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    ellipse(this.x - 14, this.y + 10, this.r, this.r * 2);
    ellipse(this.x, this.y + 10, this.r, this.r * 2);
    ellipse(this.x + 14, this.y + 10, this.r, this.r * 2);
    fill(0);
    ellipse(this.x - 10 + this.eye, this.y, this.r / 3, this.r / this.eyesize);
    ellipse(this.x + 10 + this.eye, this.y, this.r / 3, this.r / this.eyesize);

    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed = -this.xspeed;
      this.eye = -this.eye;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.yspeed = -this.yspeed;
    }

  }

  blink() {
    if (this.count > this.blinktime && this.count < this.blinktime + 10) {
      this.eyesize = 10;
    } else {
      this.eyesize = 2;
    }
    if (this.count > 200) {
      this.count = 0;
    } else {
      this.count++;
    }

  }

}