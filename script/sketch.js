let currentImageIndex = 0;

const imgs = [];
const pixels = [];
const paths = [
  './assets/HAPPY.png',
  './assets/DEPRESSION.png',
  './assets/PEACE.png',
  './assets/ANGER.png',
];
const particles = [];

function preload() {
  paths.forEach((eachPath) => {
    imgs.push(loadImage(eachPath));
  });
}

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  pixels.push(readPixels(imgs[0]));

  background('black');
  noStroke();
}

function draw() {
  background('black');
  particles.forEach((eachParticle) => {
    eachParticle.update();
    eachParticle.display();
  });
}

function readPixels(img) {
  img.loadPixels();
  const multiplier = height / img.height;
  const xZero = width / 2 - (img.width / 2) * multiplier;
  const yZero = height / 2 - (img.height / 2) * multiplier;
  for (let y = 0; y < img.height; y += 2) {
    for (let x = 0; x < img.width; x += 2) {
      const idx = 4 * (img.width * y + x);
      const rIdx = idx + 0;
      const gIdx = idx + 1;
      const bIdx = idx + 2;
      const aIdx = idx + 3;
      const r = img.pixels[rIdx];
      const g = img.pixels[gIdx];
      const b = img.pixels[bIdx];
      const a = img.pixels[aIdx];

      particles.push(
        new Particle(
          random(width),
          random(height),
          xZero + x * multiplier,
          yZero + y * multiplier,
          color(r, g, b, a)
        )
      );
    }
  }
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % imgs.length;
  particles.length = 0;
  pixels.length = 0;
  pixels.push(readPixels(imgs[currentImageIndex]));
}
