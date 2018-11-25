

var freqSlider, ampSlider;
var osc,fft;


function setup() {
   var canvas = createCanvas(710, 400);
   canvas.parent( "container");
   textSize(15);

   freqSlider = createSlider(0, 500, 10);
   freqSlider.parent("container");
   freqSlider.position(20, 20);

   ampSlider = createSlider(0, 100, 1);
   ampSlider.parent("container");
   ampSlider.position(20, 50);

  osc = new p5.TriOsc();
  osc.amp(.25);
  osc.freq(0);
  fft = new p5.FFT();
  osc.start();
}

function draw() {
  background(255);
  var freqValue= freqSlider.value();
  var ampValue = ampSlider.value();

  osc.freq(freqValue);
  osc.amp(ampValue/100.0);

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();


}
