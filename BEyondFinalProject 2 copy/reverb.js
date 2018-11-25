var sound, reverb;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/Damscray_DancingTiger');

  // disconnect the default connection
  // so that we only hear the sound via the reverb.process
  soundFile.disconnect();
}

function setup() {
  createCanvas(720,100);
  background(0);

  reverb = new p5.Reverb();

  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
  reverb.process(soundFile, 6, 0.2);

  reverb.amp(4); // turn it up!
}

function mousePressed() {
  soundFile.play();
}

var noise, env, delay;

function setup() {
  background(0);
  noStroke();
  fill(255);
  textAlign(CENTER);
  text('click to play', width/2, height/2);

  noise = new p5.Noise('brown');
  noise.amp(0);
  noise.start();

  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  delay.process(noise, .12, .7, 2300);

  // play the noise with an envelope,
  // a series of fades ( time / value pairs )
  env = new p5.Env(.01, 0.2, .2, .1);
}

// mouseClick triggers envelope
function mouseClicked() {
  // is mouse over canvas?
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    env.play(noise);
  }
}
