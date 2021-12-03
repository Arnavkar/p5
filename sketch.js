//Sound Visualizer v2
p5.disableFriendlyErrors = true; // disables FES
class Particle{
  constructor(min,max,mode){
    this.min = min
    this.max = max
    this.pos = p5.Vector.random2D().mult((this.min+this.max)/2)
    if (mode == 3 || mode == 4) this.pos = p5.Vector.random2D().mult((this.min-100+this.max-100)/2)
    this.size = random(1,4)
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))
  }
  visible(){
    if (this.pos.x < -width/2 || this.pos.x > width/2 ||
      this.pos.y < -height/2 || this.pos.y > height/2){
      return false
    }
    return true
  }

  display(cond){
    push()
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size)
    pop()
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if(cond){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
}

class VIS{
  constructor(minRadius,maxRadius,fft){
    this.min = minRadius
    this.max = maxRadius
    this.rotateVal = 0
    this.fft = fft
  }

  display = (mode,wave) => {
    if (mode == 1){
      push()
      for(var t = -1; t < 2; t+=2){
        beginShape() // create 2 half circles
        for (var i = 0; i <= 180; i++){
          let index = floor(map(i,0,180,0,wave.length-1)) // map values to window width to retrieve specific values
          let r = map(wave[index], -1, 1, this.min, this.max)
          let x1 = r * sin(i) * t
          let y1 = r * cos(i)
          vertex(x1,y1)
        }
        endShape()
      }
      pop()
    }
    if (mode == 2) {
      push()
      strokeWeight(1)
      beginShape()
      for (var i = 0; i <= 180; i+=10){
        let index = floor(map(i,0,180,0,wave.length-1)) // map values to window width to retrieve specific values
        let r = map(wave[index], -1, 1, this.min, this.max)

        let x1 = r * sin(i)
        let y1 = r * cos(i)
        curveVertex(x1,y1)
        curveVertex(x1*-1,y1)
      }
      endShape()
      pop()
    }
    if (mode == 3) {
      push()
      strokeWeight(0.5)
      for(var t = -1; t < 2; t+=2){
        rotate(this.rotateVal)
        this.rotateVal+=0.05
        beginShape()
        for (var i = 0; i <= 180; i+=10){
          let index = floor(map(i,0,180,0,wave.length-1)) // map values to window width to retrieve specific values
          let r = map(wave[index], -1, 1, this.min, this.max)
          let x1 = r * sin(i)
          let y1 = r * cos(i) * t
          curveVertex(x1,y1)
          curveVertex(x1*-1,y1*-1)
        }
        endShape()
      }
      pop()
    }
    if (mode == 4){
      push()
      strokeWeight(8)
      rotate(this.rotateVal)
      this.rotateVal+=0.1
      for(var t = -1; t < 2; t+=2){// create 2 half circles
        beginShape()
        for (var i = 0; i <= 180; i+=22.5){
          let r = map(wave, 0, 1, 50, 300)
          let x1 = 50 * sin(i) * t
          let y1 = 50 * cos(i)
          let x2 = r * sin(i) * t
          let y2 = r * cos(i)
          curveVertex(x1,y1)
          line(x1,y1,x2,y2)
        }
        endShape()
      }
      pop()
    }
  }
}

let song,fft1,fft2,vis,mic;
let mode = 1;
let particles = [];
const min = 100
const max = 350
const threshold = 230
const numModes = 4
//let count = 0

function preload(){
  song = loadSound('../assets/file.mp3')
}

function setup(){
  createCanvas(windowWidth-100, windowHeight-100)
  noFill()
  stroke(255)
  strokeWeight(3)
  angleMode(DEGREES)
  modeButton = createButton("Change Mode")
  playButton = createButton("Play/Pause")
  modeButton.mousePressed(changeMode)
  playButton.mousePressed(togglePlay)

  fft = new p5.FFT()
  fft.setInput(song)
  fft2 = new p5.FFT()
  vis = new VIS(min,max)
  mic = new p5.AudioIn();
  fft2.setInput(mic)
}

function draw(){
  background(0)
  translate(width/2, height/2)
  const wave = fft.waveform() //Returns 1024 values
  fft.analyze()
  const amp = fft.getEnergy(20,199)

  if (amp>threshold){rotate(random(-1,1))} //addShake

  if (mode == 4){
    mic.start()
    const level = mic.getLevel()
    vis.display(4,level)
  } else {
    mic.stop()
    vis.display(mode,wave)
  }
  const p = new Particle(min,max,mode)
  //count++;
  particles.push(p)
  particles.forEach((item,idx)=>{
    if (item.visible()){
      item.display(amp>threshold)
    }else {
      particles.splice(idx,1)
      //count--;
    }
  })
  push()
  strokeWeight(1.5)
  text("Current Mode: " + str(mode),width/2-100,height/2-20)
  pop() //show number of particles, ~averages at 230
}

function togglePlay(){
  if (song.isPlaying()){
    song.pause() //freeze canvas
    noLoop()
  } else {
    song.play()
    loop()
  }
}

function changeMode(){
  mode++;
  if (mode > numModes) mode = 1
}
