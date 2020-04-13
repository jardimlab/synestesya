let size, level;

function preload(){
  sound = loadSound('assets/beat.mp3');
}

function setup() {
  let cnv = createCanvas(displayWidth, displayHeight);
  translate(0, 0, 0);
  cnv.mouseClicked(toggleSound);
  amplitude = new p5.Amplitude();
}

function draw() {
  background(0);
  noStroke();
  
  rect(0,0,width, height);
  textAlign(CENTER);
  text('Clique para tocar', width/2, 20);
  level = amplitude.getLevel();
  size = map(level, 0, 1, 0, 1000);
  //fill(255,random(255),random(255),random(255));
  strokeWeight(random(0.5, 10));
  stroke(random(255),random(255),random(255));
  
  if(keyPressed()) {
    mixedForms();
  } else {
    quads();
  }
;
}

function toggleSound(){
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.play();
  }
}



function ellipses() {
  for(let i = 0; i < width; i += 100 ) {
    for(let j = 0; j < height; j += 50){
      ellipse(i, j, size, size);
    }
  } 
}

function quads() {
  for(let i = 0; i < width; i += 100 ) {
    for(let j = 0; j < height; j += 50){
      rect(i, j, size, size);
    }
  }
}
function randomQuads() {
  for(let i = 0; i < width; i += 100 ) {
    for(let j = 0; j < height; j += 50){
      rect(i+random(10), j+random(5), size, size);
    }
  }
}

function mixedForms() {
  for(let i = 0; i < width; i += 10 ) {
    for(let j = 0; j < height; j += 50){
      if(i % 2 == 0) {
        fill(random(255),random(255),random(255));
        rect(i+random(10), j+random(5), size, size);
      } else {
        ellipse(i+random(100), j+random(50), size, size); 
      }
      
    }
  }
}

function generativeSphere() {
  let radius = size; 
  translate(0, 0, 0);
  rotateX(frameCount * 0.003); 
  rotateY(frameCount * 0.004); 

  let s = 0;
  let t = 0; 
  let lastx = 0; 
  let lasty = 0;
  let lastz = 0;
  let count = 0; 

  while( t<360 ) {
    s += random(120, 160);
    t += 0.5;

    let radianS = radians(s);
    let radianT = radians(t);

    let thisx = 0 + (radius * cos(radianS) * sin(radianT)); 
    let thisy = 0 + (radius * sin(radianS) * sin(radianT));
    let thisz = 0 + (radius * cos(radianT));

    if(lastx != 0) {
      stroke(255);
      strokeWeight(0.9);
      if(count % 2 == 0) {
        line(thisx, thisy, thisz, lastx, lasty, lastz)
      }
      strokeWeight(0.06);
      stroke(255, 200, 200);
     
    }
    lastx = thisx;
    lasty = thisz;
    lastz = thisz;
    count++;
  }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
     quads();
  } else if (keyCode === DOWN_ARROW) {
    ellipses();
    console.log("teste"); 
  } else if (keyCode === LEFT_ARROW) {
    randomQuads();
  } else if (keyCode === RIGHT_ARROW) {
     mixedForms();
  }
  if(keyCode === 83) {
    generativeSphere();
  }
  return false; // prevent default
}
