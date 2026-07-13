const fs = require('fs');
const c = fs.readFileSync('js/data.js', 'utf8');

// Find backslash-singlequote pairs
for (let i = 0; i < c.length - 1; i++) {
  if (c[i] === '\\' && c[i+1] === "'") {
    console.log('Escaped quote at', i, 'context:', c.substring(Math.max(0,i-10), i+20));
  }
}

// Also find backslash-backslash pairs
for (let i = 0; i < c.length - 1; i++) {
  if (c[i] === '\\' && c[i+1] === '\\') {
    console.log('Double backslash at', i, 'context:', c.substring(Math.max(0,i-10), i+30));
  }
}
