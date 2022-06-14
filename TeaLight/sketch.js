var candleOn = true;
var x;
var lightBG;
var darkBG;
var lightCandle;
var darkCandle;
var lightMetal;
var darkMetal;
var flame1;
var flame2;

function setup() {
  createCanvas(400, 400);
  candleOn = true;
  x = 0;

  lightBG = color(44, 22, 86);
  darkBG = color(25, 13, 48);
  lightCandle = color(255, 252, 239);
  darkCandle = color(219, 206, 175);
  lightMetal = color(170);
  darkMetal = color(130);
  flame1 = color(255, 236, 114, 250);
  flame2 = color(255, 180, 68, 220);

  system = new ParticleSystem(createVector(200, 230));
}

function draw() {
  drawCandle();
  createSmoke();
  flickerCandle();
}

function mouseClicked() {
  if (mouseX > 180 && mouseX < 220 && mouseY > 185 && mouseX < 245) {
    candleOn = !candleOn;
  }
}

function drawCandle() {
  noStroke();
  if (candleOn) {
    background(lightBG);

    var y = x - 1;
    if (y < 10) {
      fill(darkBG);
      ellipse(200, 285, 115, 45);
    } else if (y > 10 || y < 20) {
      fill(darkBG);
      ellipse(200, 285, 113, 43);
    }

    fill(lightMetal);
    ellipse(200, 270, 80, 40);
    rect(160, 250, 80, 20);

    fill(lightCandle);
    ellipse(200, 250, 80, 30);

  } else {
    background(darkBG)

    fill(darkMetal);
    ellipse(200, 270, 80, 40);
    rect(160, 250, 80, 20);

    fill(darkCandle);
    ellipse(200, 250, 80, 30);
  }


}

function flickerCandle() {
  if (candleOn){
    
    noStroke();
    if (x <= 10) {
    
     fill(flame2);
     ellipse(200, 215, 35, 55);
      fill(flame1);
     ellipse(200, 223, 20, 40);

    } else if (x > 10) {
      fill(flame2);
      ellipse(200, 217, 30, 53);
    fill(flame1);
     ellipse(200, 225, 20, 35);
    }

  if (x > 20) {
    x = 0;
  }else{x++}
  }

  fill(0, 0, 0);
  rect(200, 230, 3, 19);

}

function createSmoke() {
  if (!candleOn) {
    system.addParticle();

  }
  system.run();
}

var Particle = function(position) {
  this.acceleration = createVector(-0, -0.02);
  this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
  this.position = position.copy();
  this.lifespan = 290;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  noStroke();
  fill(90, this.lifespan);
  ellipse(this.position.x, this.position.y, 10, 10);
};

Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};