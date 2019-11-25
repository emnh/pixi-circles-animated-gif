//const download = require('../ccapture.js-1.0.9/src/download.js');
//window.download = download;
const CCapture = require('../ccapture.js-1.0.9/src/CCapture.js');
const GIF = require('../ccapture.js-1.0.9/src/gif.js');
window.GIF = GIF.GIF;
const tar = require('../ccapture.js-1.0.9/src/tar.js');
//const CCapture = require('./CCapture.all.min.js');

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
  const app = new PIXI.Renderer({
    width: width, height: height, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  });
  document.body.appendChild(app.view);

  /*
  const gif = new GIF(app.view.getContext('webgl2'), {
    fps: 24,
    repeat: 0,
    quality: 20,
    width: width,
    height: height
  });
  */

  const container = new PIXI.Container();

  const capturer = new CCapture({
    format: 'gif',
    workersPath: './ccapture.js-1.0.9/src/',
    framerate: 24,
    verbose: true
  });
  console.log(capturer);
  //capturer.encoder.setOption( 'width', width );
	//capturer.encoder.setOption( 'height', height );

  //app.stage.addChild(container);

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
  let frames = 0;
  let oldTime = performance.now();

  // Listen for animate update
  const rf = () => {
    //const delta = performance.now() - oldTime;
    const delta = 0.41 * 10.0;
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
    app.render(container);

    if (frames < 144) {
      console.log("frames", frames);
      if (frames === 0) {
        capturer.start();
      }
      capturer.capture(app.view);
      //gif.tick();
    } else if (!done) {
      console.log("Done. Rendering!");
      capturer.stop();
      capturer.save();
      //const dataURI = gif.done();
      //console.log(dataURI);
      //$("#render")[0].src = dataURI;
      $("#render")[0].width = width;
      $("#render")[0].height = height;
      done = true;
    }
    frames++;
    requestAnimationFrame(rf);
  };

  requestAnimationFrame(rf);
}

$(main);
