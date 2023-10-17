import React from 'react';
import Sketch from 'react-p5';
import './css/Visuals.css';

export default function Visuals() {
  let noiseOffsetX = 0;
  let noiseOffsetY = 10000;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(0);
    p5.colorMode(p5.HSB, 360, 100, 100, 1);
  };

  const draw = (p5) => {
    p5.blendMode(p5.BLEND);
    p5.background(0, 0.05);
    p5.blendMode(p5.ADD);

    for (let y = 0; y < p5.height; y += 20) {
      for (let x = 0; x < p5.width; x += 20) {
        const noiseVal = p5.noise(noiseOffsetX + x * 0.05, noiseOffsetY + y * 0.05);
        const angle = noiseVal * p5.TWO_PI * 4;
        const length = noiseVal * 25;
        let endX = x + p5.cos(angle) * length;
        let endY = y + p5.sin(angle) * length;

        const distanceToMouse = p5.dist(endX, endY, p5.mouseX, p5.mouseY);
        if (distanceToMouse < 50) {
          const pushAway = (50 - distanceToMouse) * 0.5;
          const pushAngle = p5.atan2(p5.mouseY - endY, p5.mouseX - endX);
          const pushX = p5.cos(pushAngle) * pushAway;
          const pushY = p5.sin(pushAngle) * pushAway;

          // Apply the push to the end points
          endX += 4*pushX;
          endY += 4*pushY;
        }

        const hue = (noiseVal * 360 + p5.frameCount) % 360;
        p5.stroke(hue, 80, 80, 0.8);
        p5.line(x, y, endX, endY);
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
