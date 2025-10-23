const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Chemin vers ton PNG source
const inputPath = path.join(__dirname, 'images', 'logo.png');

// --- 1) Génération favicon.ico dans /app ---
const studioDir = path.join(__dirname, 'app');
const outputIcoPathApp = path.join(studioDir, 'favicon.ico');

pngToIco(inputPath)
  .then(buf => {
    fs.writeFileSync(outputIcoPathApp, buf);
    console.log('favicon.ico généré avec succès dans /app !');
  })
  .catch(err => console.error('Erreur favicon.ico /app:', err));

// --- 2) Génération des PNG redimensionnés dans dist/static ---
const distStaticDir = path.join(__dirname, 'dist', 'static');

const pngSizes = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-96.png', size: 96 },
  { name: 'favicon-192.png', size: 192 },
  { name: 'favicon-512.png', size: 512 },
];

const pngPromises = pngSizes.map(({ name, size }) => {
  const outputPath = path.join(distStaticDir, name);
  return sharp(inputPath)
    .resize(size, size)
    .toFile(outputPath)
    .then(() => console.log(`${name} généré avec succès (${size}x${size})`));
});

// --- 3) Génération favicon.ico dans dist/static ---
const outputIcoPathStatic = path.join(distStaticDir, 'favicon.ico');
const icoPromiseStatic = pngToIco(inputPath)
  .then(buf => {
    fs.writeFileSync(outputIcoPathStatic, buf);
    console.log('favicon.ico généré avec succès dans dist/static !');
  });

// --- 4) Génération dist/favicon.ico ---
const distDir = path.join(__dirname, 'dist');
const outputIcoPathDist = path.join(distDir, 'favicon.ico');
const icoPromiseDist = pngToIco(inputPath)
  .then(buf => {
    fs.writeFileSync(outputIcoPathDist, buf);
    console.log('favicon.ico généré avec succès dans dist/ !');
  });

// --- 5) Génération favicon.svg dans dist/static à partir de favicon-512.png ---
const outputSvgPath = path.join(distStaticDir, 'favicon.svg');
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <image href="favicon-512.png" width="512" height="512"/>
</svg>
`;
fs.writeFileSync(outputSvgPath, svgContent.trim());
console.log('favicon.svg généré avec succès dans dist/static !');

// --- 6) Attendre toutes les promesses PNG + ICO ---
Promise.all([...pngPromises, icoPromiseStatic, icoPromiseDist])
  .then(() => console.log('Toutes les images ont été générées avec succès !'))
  .catch(err => console.error('Erreur lors de la génération des images :', err));