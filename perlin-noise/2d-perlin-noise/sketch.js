//Perlin Noise Visualization in 2D

const ex3 = p => {
  let inc;

  p.setup = () =>{
    p.createCanvas(400,400)
    //p.pixelDensity(1) - set pixel density
    inc = 0.01
  }

  p.draw = () =>{
    p.loadPixels();
    p.noiseDetail(24)
    let yoff = 0;
    for (var x = 0; x<p.width; x++){
      let xoff = 0 //You should restart xoff at 0 for each row
      for (var y = 0; y<p.height; y++){
        const index = (x+y*p.width)*4
        let r = p.noise(xoff,yoff)*255
        p.pixels[index] = r
        p.pixels[index+1] = r
        p.pixels[index+2] = r
        p.pixels[index+3] = 255
        xoff+=inc
      }
      yoff += inc
    }
    p.updatePixels()
  }
}

new p5(ex3,"ex3")
