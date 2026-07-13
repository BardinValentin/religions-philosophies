const fs = require('fs');
const code = fs.readFileSync('js/data.js', 'utf8');

// The error is "missing ) after argument list". This happens when V8 sees
// an expression like `foo(bar` without the closing `)`.
// The most common cause in this code would be in a string that contains
// something V8 misinterprets.

// Let's try to parse using acorn to get a precise location
// But since we may not have acorn, let's try a manual approach

// Build line-prefixed version
const lines = code.split('\n');

// Try constructing Function incrementally to find exact error
for (let endLine = 1; endLine <= lines.length; endLine++) {
  const partial = lines.slice(0, endLine).join('\n') + '\n)';
  try {
    new Function(partial);
  } catch(e) {
    if (endLine > 1190) {
      console.log('Error at or after line', endLine);
      break;
    }
  }
}
