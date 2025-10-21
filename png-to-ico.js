const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');

// Chemin vers ton PNG
const inputPath = path.join(__dirname, 'images', 'logo.png');

// Chemin de sortie dans /app/studio
const studioDir = path.join(__dirname, 'app');
const outputPath = path.join(studioDir, 'favicon.ico');


// Conversion PNG → ICO
pngToIco(inputPath)
  .then(buf => {
    fs.writeFileSync(outputPath, buf);
    console.log('favicon.ico généré avec succès dans /app/studio !');
  })
  .catch(err => console.error('Erreur:', err));
