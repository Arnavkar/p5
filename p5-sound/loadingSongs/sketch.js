// Loading,Playing,Queueing,Jumping Sound

let song;
function preload(){
  song = loadSound('../assets/file.mp3');
}
function setup() {

  createCanvas(400, 400);
  background(100);
  button = createButton("play")
  button.mousePressed(togglePlaying)
  jumpButton = createButton("jump")
  jumpButton.mousePressed(jumpSong)
  song.addCue(2,showTime, color(250,50,50))//time in seconds where the queue should trigger, function that gets called, argument
}

function showTime(col){
  background(col)
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

function jumpSong(){
  let dur = song.duration()
  song.jump(random(0))
}
