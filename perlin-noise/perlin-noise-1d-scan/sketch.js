//Perlin Noise Graph Scan

const ex1 = p => {
  let start;
  let inc;

  p.setup = () =>{
    p.createCanvas(1440,900)
    start = 0;
    inc = 0.01
  }

  p.draw = () =>{
    p.background(0)
    p.stroke(255)
    p.noFill()
    p.beginShape();
    let xoff = start;
    for (var x = 0; x<p.width; x++){
      let y = p.noise(xoff)*p.height
      p.vertex(x,y)
      xoff+=inc //increments the offset to essentially read different points off a perlin noise graph
    }
    p.endShape();
    start+=inc // slowly increments the startpoint of the perlin noise graph -> scan right
  }
}

new p5(ex1,"ex1")
