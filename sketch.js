//camera setup 
let cam;
let isVideoLoaded = false;
let isVideoPlaying = false;
let isRecording = false;

//framestrip array setup
let pastFrames = [];
let numFrames = 150;
let stripHeight;

//posenet setup
let poseNet;
let pose;
let skeleton;
let canvas;

//canvas
const sketchWidth = 640;
const sketchHeight= 480;

//bobcat
let mascot = [];
let numMascots = 10;


function preload() {
  for (let i = 0; i <numMascots; i++) {
      mascot[i] = loadImage("assets/mascot" + i + ".png");
  }
}

function setup() {
  let canvas = createCanvas(sketchWidth, sketchHeight);
  pixelDensity(1);
  cam = createCapture(VIDEO);
  cam.hide();
  const poseNet = ml5.poseNet(cam, modelLoaded);
  poseNet.on('pose', gotPoses);
  //layers
  stripHeight = height / numFrames;
  for (let i = 0; i < numFrames; i++) {
    let layer = createGraphics(width, height);
    pastFrames.push(layer);
  }
}
//posenet listener
function modelLoaded() {
    console.log('poseNet ready');
}

//set up pose array
function gotPoses(poses) {
    console.log(poses); 
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }

//draw sketch
function draw() {
  background(220);
//   image(cam, 0, 0, sketchWidth, sketchHeight);
    pastFrames[0].image(cam, 0, 0, width, height);
    for (let i = 0; i < pastFrames.length; i++) {
        image(pastFrames[i], 0, stripHeight * i, width, stripHeight, 0, stripHeight * i, width, stripHeight);
        //tint(0, random(80, 160), random(20,104));
      }
    
      for (let i = 0; i < pastFrames.length; i++) {
        pastFrames[i] = pastFrames[i + 1];
      }
    
      pastFrames[pastFrames.length - 1] = pastFrames[0];

  //look for poses
  if (pose) {
    let earR = pose.rightEar;
    let earL = pose.leftEar;
    let d = dist(earR.x, earR.y, earL.x, earL.y);
    fill(0, 100, 0);
    let randomMascot = random(mascot)
    image (randomMascot, pose.rightEar.x, pose.nose.y-d, 300, 300)
    
    filter (POSTERIZE, 3);
    
    
    //fill(0, 0, 255);
    //ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    //ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(random(0,255),random(0,255),random(0,255));
    //   ellipse(x,y,16,16);
    // }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
  }
  

}

function mousePressed() {
  noLoop();
  saveCanvas('myCanvas', 'jpg');
  draw();
}
