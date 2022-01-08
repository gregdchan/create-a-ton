# About Create-a-ton
Create-a-ton is a 36 hours challenge that pairs NYU IMA Low Res students to collaborate on an interactive experience that can be playful, silly, exciting or absurd. Students are given an "input" and "output" that is, theme that should go into the project, and a resulting theme that should be come out of the project. Working in pairs, teams brainstorm, design, code and present their ideas to each other at the end of the challenge.
## Our Team
Greg Chan
Lu Song -https://github.com/songyue99

## About our project
Our team's input and output were:

Input = Education
Output = Abstract Art

Based on the assigned input/output topics, our team devised a simple experience that combines a P5 sketch and a collection of college mascots to allows users to create generative fan art. 

### Javascript libraries used:
P5.js
ML5.js

### Design Steps
1. A static website is created with linked libraries and a p5js sketch.
2. The P5 sketch captures the computer's camera feed, a posterized effect is added.
3. The video feed's frame rate is then delayed and pushed, creating a slight delay. When the user moves within the screen, the video creates a "jiggle" effect.
4. In the sketch, a collection of college sports mascot heads are clipped and added to an array on load.
5. These images are then mapped to the user face via ML5's posenet.
6. When the user clicks their mouse, the a screenshot of the canvas is taken. 
7. Their movement + the delay effects+ can create some Zany patterns. At mouseclick that art can be captured and saved!

# Update
Our project received the "Most Creative use of Input/Output" award!
