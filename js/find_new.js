const fs = require('fs');
const c = fs.readFileSync('js/data.js', 'utf8');
const regex = /new vis\.DataSet\(/g;
let m;
while ((m = regex.exec(c)) !== null) {
  console.log('Found at', m.index, 'line', c.substring(0,m.index).split('\n').length);
}

// Find closing parens for each
let pos = 0;
let count = 0;
while (true) {
  const idx = c.indexOf('new vis.DataSet(', pos);
  if (idx === -1) break;
  count++;
  // Find matching closing paren
  let depth = 1;
  let i = idx + 16; // skip past "new vis.DataSet("
  let inStr = false;
  for (; i < c.length && depth > 0; i++) {
    if (c[i] === "'" && (i === 0 || c[i-1] !== '\\')) inStr = !inStr;
    if (!inStr) {
      if (c[i] === '(') depth++;
      if (c[i] === ')') depth--;
    }
  }
  const closePos = i - 1;
  console.log('new vis.DataSet #' + count + ' opens at', idx, 'closes at', closePos, 'line', c.substring(0,closePos).split('\n').length);
  console.log('Close context:', c.substring(Math.max(0,closePos-5), closePos+5));
  pos = idx + 1;
}
