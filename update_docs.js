const fs = require('fs');
const path = require('path');

function updateShowcase(blockFile, showcaseFile, regexStr) {
  const block = fs.readFileSync(path.join('src/components/custom/blocks', blockFile), 'utf8');
  let showcase = fs.readFileSync(path.join('src/components/site', showcaseFile), 'utf8');
  
  const regex = new RegExp(regexStr);
  const escapedBlock = block.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  
  const replacement = regexStr.split(' ')[0] + ' ' + regexStr.split(' ')[1] + ' = `' + escapedBlock + '`;';
  
  showcase = showcase.replace(regex, replacement);
  fs.writeFileSync(path.join('src/components/site', showcaseFile), showcase);
}

updateShowcase('ThreeDCarouselBlock.tsx', 'Carousel3DShowcase.tsx', 'const CAROUSEL_CODE_TS = `[\\\\s\\\\S]*?`;');
updateShowcase('MemoriesCardBlock.tsx', 'MemoriesCardShowcase.tsx', 'const MEMORIES_CODE_TS = `[\\\\s\\\\S]*?`;');
