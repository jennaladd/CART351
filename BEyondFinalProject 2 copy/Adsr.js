
var freqSlider, ampSlider;

var osc, osc1, envelope, fft;

var sound, reverb;

var scaleArray = [45, 30, 40, 30, 40, 25, 50, 20];
var scaleArray1 = [60, 60, 60, 60, 40, 60, 60, 20];

var note = 0;

function setup() {
  createCanvas(1920, 1080);
  osc = new p5.SinOsc();
  osc1 = new p5.TriOsc();
  reverb = new p5.Reverb();
  envelope = new p5.Env();

  freqSlider = createSlider(0, 500, 10);
  freqSlider.parent("container");
  freqSlider.position(20, 20);

  ampSlider = createSlider(0, 100, 1);
  ampSlider.parent("container");
  ampSlider.position(20, 50);

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.1, 0.5, 0.5, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(5, 0);

  reverb.process(osc);


  osc.start();
  osc1.start();
  reverb.amp(.10);

  osc.amp(envelope);
  osc1.amp(envelope);

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(20);

  if (frameCount % 60 == 0 || frameCount == 1) {
    var midiValue = scaleArray[note];
    var midiValue1 = scaleArray1[note];
    var freqValue = midiToFreq(midiValue);
    var freqValue1 = midiToFreq(midiValue1);

    var freqValue= freqSlider.value();
    var freqValue1= freqSlider.value();
    var ampValue = ampSlider.value();

    osc.freq(freqValue);
    osc1.freq(freqValue1);
    reverb.amp(.1)
    osc.amp(ampValue/100.0);
    osc1.amp(ampValue/100.0);

    //reverb.amp(.1);


    envelope.play(osc, 0, 0.1);
    note = (note + 1) % scaleArray.length;

    envelope.play(osc1, 0, 0.1);
    note = (note + 1) % scaleArray.length;


  }

  // plot FFT.analyze() frequency analysis on the canvas
  var spectrum = fft.analyze();
  for (var i = 0; i < spectrum.length/20; i++) {
    fill(spectrum[i], spectrum[i]/10, 0);
    var x = map(i, 0, spectrum.length/20, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length/20, -h);
  }
}
