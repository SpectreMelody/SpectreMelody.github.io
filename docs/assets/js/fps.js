let frameCount = 0;
let lastTime = performance.now();
const fpsElement = document.getElementById("fps");

function animate() {
  frameCount++;

  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= 1000) {
    const fps = frameCount;
    fpsElement.textContent = `FPS: ${fps}`;

    if(fps > 20)
    {
        fpsElement.classList.remove("text-red-500");
        fpsElement.classList.add("text-white");
    }else{
        fpsElement.classList.add("text-red-500");
        fpsElement.classList.remove("text-white");
    }

    frameCount = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(animate);
}

animate();
