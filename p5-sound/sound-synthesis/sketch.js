//Sound Synthesis

let wave;
let playing = false
let slider;

function setup(){
  createCanvas(100,100)
  wave = new p5.Oscillator();
  wave.setType('sine') //square, triangle, sawtooth

  button = createButton("play/pause")
  button.mousePressed(toggle)
  slider = createSlider(100,1200,440)
}

function draw(){
  background(100)
  wave.freq(slider.value())
}

function toggle(){
  if (!playing){
    wave.start()
    wave.amp(0)
    playing = !playing
    //second argument is a delay duration to reach the desired amp
    wave.amp(0.2,0.5)

  } else {
    playing = !playing
    wave.amp(0,0.5)
  }
}
