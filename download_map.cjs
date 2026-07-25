const fs = require('fs');
const https = require('https');

https.get('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract paths
    const paths = data.match(/<path[^>]*d="([^"]*)"/g);
    let combined = '';
    if (paths) {
      paths.forEach(p => {
        const d = p.match(/d="([^"]*)"/)[1];
        combined += d + ' ';
      });
    }
    
    // We export it as a TS file
    fs.writeFileSync('src/components/canvas/worldPath.ts', `export const WORLD_PATH = \`${combined}\`;\n`);
    console.log("Map path extracted! Length: " + combined.length);
  });
});
