// Amp analysis - volume analysis

let song;

function setup() {
  createCanvas(400, 400);
  song = loadSound('../assets/file.mp3',loaded) //what to do upon loading
  amp = new p5.Amplitude()
  background(100);
}

function loaded(){
  button = createButton("play")
  button.mousePressed(togglePlaying)
}

function draw(){
  background(100)
  let vol = map(amp.getLevel(),0,1,0,400)
  fill(255,0,255)
  ellipse(width/2,height/2,vol,vol)
}

function togglePlaying(){
  if (!song.isPlaying()) {
    song.play();
    button.html("pause")
    // .isPlaying() returns a boolean
  } else {
    song.pause(); //song.stop() will stop and go back to the start
    button.html("play")
  }
}
