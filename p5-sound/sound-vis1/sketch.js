//Sound Visualizer v1

let song;
let fft;
let button;

var w;

function preload(){
  song = loadSound('../assets/file2.mp3')
}

function toggleSong(){
  if(song.isPlaying()) {
    song.pause();
  } else {
    song.play()
  }
}

function setup(){
  createCanvas(256,256)
  angleMode(DEGREES)
  button=createButton("toggle")
  button.mousePressed(toggleSong)
  song.play()
  fft = new p5.FFT(0,64)//Smoothing amount for freq, number of bins (1024 default)
  w = width/64
}

function draw(){
  background(0)
  stroke(255)
  for (var i = 0; i < spec.length; i++){
    var val = spec[i]
    var y = map(val,0,255,height,0)
    line(i*w,height,i*w,y)
  }

}
