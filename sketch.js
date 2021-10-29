//camera setup 
let cam;
let isVideoLoaded = false;
let isVideoPlaying = false;

//framestrip array setup
let pastFrames = [];
let numFrames = 150;
let stripHeight;
let isRecording = false;

//posenet setup
let poseNet;
let pose;
let skeleton;


function onVideoLoad() {
  isVideoLoaded = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  
  //start camera
  cam = createCapture(VIDEO);
  cam.hide();
  stripHeight = windowHeight / numFrames;
  poseNet = ml5.poseNet(cam, modelLoaded);
  poseNet.on('pose', gotPoses);

  //create past frames
  for (let i = 0; i < numFrames; i++) {
    let layer = createGraphics(width, height);
    pastFrames.push(layer);
  }
}

function gotPoses(poses) {
    //console.log(poses); 
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }
  function modelLoaded() {
    console.log('poseNet ready');
  }

function draw() {
  background(220);
  pastFrames[0].image(cam, 0, 0, width, height);


  for (let i = 0; i < pastFrames.length; i++) {
    image(pastFrames[i], 0, stripHeight * i, width, stripHeight, 0, stripHeight * i, width, stripHeight);
  }

  for (let i = 0; i < pastFrames.length; i++) {
    pastFrames[i] = pastFrames[i + 1];
  }

  pastFrames[pastFrames.length - 1] = pastFrames[0];

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    
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
  // if (!isVideoPlaying) {
  //   isVideoPlaying = true;
  //   vid.loop();
  // } else {
  //   isVideoPlaying = false;
  //   vid.stop();
  // }


}


/*function toggleRecording() {
  if (!isRecording) {
    isRecording = true;
    startRecording();
    document.querySelector('#button').textContent = 'stop recording ⏹️';

  } else {
    isRecording = false;
    stopRecording();
    document.querySelector('#button').disabled = true;
  }
} */