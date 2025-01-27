let frameCount = 0;
let lastTime = performance.now();
const fpsElement = document.getElementById("fps");

function animate() {
  // Increment the frame count
  frameCount++;

  // Calculate the time elapsed since the last frame
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;

  // If one second has passed, update the FPS display
  if (deltaTime >= 1000) {
    const fps = frameCount; // FPS is the number of frames counted
    fpsElement.textContent = `FPS: ${fps}`;

    // Reset for the next second
    frameCount = 0;
    lastTime = currentTime;
  }

  // Call the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
