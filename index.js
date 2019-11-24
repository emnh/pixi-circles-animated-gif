
function drawCircle(graphics, x, y, color) {
  // Circle
  graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
  graphics.beginFill(color, 1);
  const r = 5;
  graphics.drawCircle(2 * r * x, 2 * r * y, r - 1);
  graphics.endFill();
}

function createGIF(canvasElement) {
  

  // add a image element
//   gif.addFrame(imageElement);

  // or a canvas element
  
}

function main() {
  const width = 270;
  const height = 250;
  const app = new PIXI.Application({
    width: width, height: height, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  });
  document.body.appendChild(app.view);

  var gif = new GIF({
    workers: 2,
    quality: 10,
    width: width,
    height: height
  });
  
  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
  });
  
  const container = new PIXI.Container();

  app.stage.addChild(container);

  // Move container to the center
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  // Center bunny sprite in local container coordinates
//   container.pivot.x = container.width / 2;
//   container.pivot.y = container.height / 2;

  const graphics = new PIXI.Graphics();

  container.addChild(graphics);

  let t = 0.0;
  let done = false;
  
  // Listen for animate update
  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
//     container.rotation -= 0.01 * delta;
    graphics.clear();
    const xk = 13;
    const yk = 12;
    for (var x = -xk; x <= xk; x++) {
      for (var y = -yk; y <= yk; y++) {
        const xp = x + xk;
        const yp = y + yk;
        t += delta;
        const dt = t / 20000.0;
        const color = PIXI.utils.rgb2hex([20 * xp + dt, 20 * yp + dt, 20 * xp * yp + dt]);
        drawCircle(graphics, x, y, color);
      }
    }
    
    if (t < 5.0) {
      gif.addFrame(app.view, {delay: 16});
    } else if (!done) {
      gif.render();
      console.log("Done. Rendering!");
      done = true;
    }
  });
  
//   createGIF(app.view);
}

$(main);
