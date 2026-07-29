const fs = require('fs');
const path = require('path');

const memoryBlock = fs.readFileSync(path.join('src/components/custom/blocks/MemoriesCardBlock.tsx'), 'utf8');
let memoryShowcase = fs.readFileSync(path.join('src/components/site/MemoriesCardShowcase.tsx'), 'utf8');

const regex = /const MEMORIES_CODE_TS = `[\s\S]*?`;/;
const escapedBlock = memoryBlock.replace(/`/g, '\\`').replace(/\$/g, '\\$');

const replacement = 'const MEMORIES_CODE_TS = `' + escapedBlock + '`;';

memoryShowcase = memoryShowcase.replace(regex, replacement);
fs.writeFileSync(path.join('src/components/site/MemoriesCardShowcase.tsx'), memoryShowcase);
