const fs = require('fs');
const urls = JSON.parse(fs.readFileSync('cloudinary-urls.json', 'utf8'));

// Find URLs with w_800 or w_1200 or w_1600 or photo- that are landscape/nature/architecture
const landscape = urls.filter(u => 
  (u.includes('photo-') || u.includes('pexels-photo-')) &&
  !u.includes('120,h_120') &&
  !u.includes('w_120') &&
  !u.includes('w_200')
);

console.log('Found landscape images:', landscape.length);
const unique = [...new Set(landscape)];
console.log('Unique:', unique.length);
fs.writeFileSync('cloudinary-travel.json', JSON.stringify(unique.slice(0, 20), null, 2));
console.log('Saved 20 to cloudinary-travel.json');
