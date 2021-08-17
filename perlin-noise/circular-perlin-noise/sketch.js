/*
	Generative Patterns: Sine + Perlin Noise
	By: Justin J (cyberart_by_justin)
  Modified By: Arnav S
	June 10th, 2021
*/

/*
	Noisy Sinewave Class
	x_scale & y_speed: around 0.01 is good
	y_attn : y attenuation: around 1/10 to 1/3 of the window height is good
*/

const ex2 = p => {
  var waveSys;
  var W = 1440,
  		H = 900;

  class NoisySine{
    constructor(x_scale_,y_speed_,y_attn_,offset_,mode){
      this.N = 200;
    	this.x_scale = x_scale_;
    	this.y_speed = y_speed_;
    	this.y_attn = y_attn_;
    	this.offset = offset_;
      this.mode = mode
    }
    //completely to scale with current display (no explicitly stated values)
    getTheta = (x1,y1,x2,y2,r) => {
      const distsq = (p.dist(x1,y1,x2,y2))**2
      const theta = p.acos( (2*(r**2) - distsq)/(2*(r**2)) )
      return theta
    }

    display = (xpos,ypos) => {
      const r = 200
      p.push();
      p.strokeWeight(0.2);
    	p.translate(xpos,ypos);
      p.beginShape()
    	for (var i = 0; i < this.N; i++){
    		let x = p.norm(i,0,this.N)*W/(p.PI/3);
    		let y_off = p.lerp(-this.y_attn,this.y_attn,p.noise(x*this.x_scale,p.frameCount*this.y_speed + this.offset));
    		let theta = p.radians(x) + p.PI/2;
        let y = (-H/2)+y_off;
    		x = r * p.sin(theta);
    		y = r * p.cos(theta)+y_off/1.6;
    		if(p.frameCount < 90){y = r * p.cos(theta)+y_off/2};
    		if(p.frameCount < 60){y = r * p.cos(theta)+y_off/3.2};
    		if(p.frameCount < 30){y = r * p.cos(theta)+y_off/4.8};
    		if (y > H/2) {y = y-y_off/16};
    		if (y < -H/2) {y = y+y_off/16};
    		p.curveVertex(x,y); //or curveVertex
    	}
      p.endShape("CLOSE");
      p.pop();
      }
  }

  class NoisyWaves{
    constructor(xscale, yspeed,attnStart, attnStop,mode){
      this.waves = [];
      this.N = 50;
      this.attnStart = attnStart
      this.attnStop = attnStop
      this.mode = mode

      for (var i = 0; i < this.N; i++){
        let y_attn = p.map(i,0,this.N,attnStart,attnStop);
        this.waves.push(new NoisySine(xscale,yspeed,y_attn,i*0.01,mode));
      }
    }
    run = () => {
      for (var i = 0; i < this.N; i++){
        this.waves[i].display(W/2, H/2);
      }
    }
    //---call this function below when the window is resized---
    adjust = () => {
      for (var i = 0; i < this.N; i++){
        this.waves[i].y_attn = p.map(i,0,this.N,this.attnStart,this.attnStop);
      }
    }
  }

  p.setup = () =>  {
    p.createCanvas(W, H, p.P2D);
  	p.smooth(8);
  	p.frameRate(30);
    let c = p.color(220,40,220,85)
  	p.stroke(c);
  	p.noFill();
  	//initialize class with universal x noise scale and noise speed
  	waveSys = new NoisyWaves(0.1,0.004,-H*0.13, H*0.13);
  }

  p.draw = () => {
    p.background(0);
  	waveSys.run();
  }

  p.windowResized = () =>{
  	waveSys.adjust();
  }
}
new p5(ex2, "ex2")
