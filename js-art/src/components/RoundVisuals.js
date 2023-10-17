import React from 'react';
import Sketch from 'react-p5';
import '../css/Visuals.css';

export default function RoundVisuals() {
  let noiseOffsetX = 0;
  let noiseOffsetY = 10000;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(0);
    p5.colorMode(p5.HSB, 360, 100, 100, 1);
    p5.noStroke();
  };

  const draw = (p5) => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    for (let y = 0; y < p5.height; y += 60) {  // Increased spacing to fit circles better
      for (let x = 0; x < p5.width; x += 60) {  // Same here
        const noiseVal = p5.noise(noiseOffsetX + x * 0.05, noiseOffsetY + y * 0.05);
        const diameter = noiseVal * 50;

        const distanceToMouse = p5.dist(x, y, p5.mouseX, p5.mouseY);
        let offsetX = 0;
        let offsetY = 0;

        if (distanceToMouse < 75) {  // Increased distance a bit for larger shapes
          const pushAway = (75 - distanceToMouse) * 0.5;
          const pushAngle = p5.atan2(p5.mouseY - y, p5.mouseX - x);
          offsetX = p5.cos(pushAngle) * pushAway;
          offsetY = p5.sin(pushAngle) * pushAway;
        }

        const hue = (noiseVal * 360 + p5.frameCount) % 360;
        p5.fill(hue, 80, 80, 0.8);
        p5.ellipse(x + offsetX, y + offsetY, diameter);
      }
    }

    noiseOffsetX += 0.03;
    noiseOffsetY += 0.03;
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}
