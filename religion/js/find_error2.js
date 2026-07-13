const fs = require('fs');
const code = fs.readFileSync('js/data.js', 'utf8');

// Trace string state for each character and find parens that are truly outside strings
// Handle comments properly too
let inSingle = false;
let inDouble = false;
let inLineComment = false;
let inBlockComment = false;

let outsideParens = [];

for (let i = 0; i < code.length; i++) {
  const ch = code[i];
  const prev = i > 0 ? code[i-1] : '';
  const next = i < code.length - 1 ? code[i+1] : '';
  
  // Handle line comments
  if (!inSingle && !inDouble && !inBlockComment && ch === '/' && next === '/') {
    inLineComment = true;
    continue;
  }
  if (inLineComment && ch === '\n') {
    inLineComment = false;
    continue;
  }
  
  // Handle block comments
  if (!inSingle && !inDouble && !inLineComment && ch === '/' && next === '*') {
    inBlockComment = true;
    continue;
  }
  if (inBlockComment && ch === '*' && next === '/') {
    inBlockComment = false;
    i++; // skip next char
    continue;
  }
  
  // Skip if in comment
  if (inLineComment || inBlockComment) continue;
  
  // String state
  if (!inDouble && !inLineComment && !inBlockComment && ch === "'" && prev !== '\\') inSingle = !inSingle;
  if (!inSingle && !inLineComment && !inBlockComment && ch === '"' && prev !== '\\') inDouble = !inDouble;
  
  // Count parens outside strings
  if (!inSingle && !inDouble && !inLineComment && !inBlockComment) {
    if (ch === '(') outsideParens.push({pos: i, char: ch});
    if (ch === ')') outsideParens.push({pos: i, char: ch});
  }
}

// Find balance
let depth = 0;
let unmatched = [];
for (let p of outsideParens) {
  if (p.char === '(') { depth++; unmatched.push(p); }
  if (p.char === ')') {
    depth--;
    if (unmatched.length > 0) unmatched.pop();
    else console.log('EXTRA ) at', p.pos, 'context:', code.substring(Math.max(0,p.pos-40), p.pos+40));
  }
}

console.log('Final depth:', depth);
console.log('Unmatched opens:', unmatched.length);
if (unmatched.length > 0) {
  for (let u of unmatched) {
    const line = code.substring(0, u.pos).split('\n').length;
    console.log('Unmatched ( at', u.pos, 'line', line);
    console.log('Context:', code.substring(Math.max(0,u.pos-80), Math.min(code.length, u.pos+80)));
  }
}
