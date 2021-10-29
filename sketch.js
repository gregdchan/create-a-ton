let vid;
let isVideoLoaded = false;
let isVideoPlaying = false;

let cam;

let pastFrames = [];
let numFrames = 100;
let stripHeight;
let isRecording = false;

//posenet variables
let poseNet;
let pose;
let skeleton;

function onVideoLoad() {
  isVideoLoaded = true;
}

function setup() {
  createCanvas(windowWidth/1.5, windowHeight/1.5);
  pixelDensity(1);

  
  // vid = createVideo("calvin.mp4", onVideoLoad);
  // vid.hide();

  cam = createCapture(VIDEO);
  cam.hide();

  stripHeight = height / numFrames;

  for (let i = 0; i < numFrames; i++) {
    let layer = createGraphics(width, height);
    pastFrames.push(layer);
  }
}

function draw() {
  background(220);

  // if(isVideoPlaying){
  pastFrames[0].image(cam, 0, 0, width, height);
  // }

  for (let i = 0; i < pastFrames.length; i++) {
    image(pastFrames[i], 0, stripHeight * i, width, stripHeight, 0, stripHeight * i, width, stripHeight);
  }

  for (let i = 0; i < pastFrames.length; i++) {
    pastFrames[i] = pastFrames[i + 1];
  }

  pastFrames[pastFrames.length - 1] = pastFrames[0];

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