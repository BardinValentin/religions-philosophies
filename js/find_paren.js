const fs = require('fs');
const code = fs.readFileSync('js/data.js', 'utf8');
const lines = code.split('\n');

let openParenPositions = [];
let inSingle = false;
let inDouble = false;

for (let i = 0; i < code.length; i++) {
  const ch = code[i];
  const prev = i > 0 ? code[i-1] : '';
  
  if (!inDouble && ch === "'" && prev !== '\\') inSingle = !inSingle;
  if (!inSingle && ch === '"' && prev !== '\\') inDouble = !inDouble;
  
  if (!inSingle && !inDouble) {
    if (ch === '(') openParenPositions.push(i);
  }
}

// Find where line 418 ends
let lineEnd418 = 0;
for (let li = 0; li < 418 && li < lines.length; li++) {
  lineEnd418 += lines[li].length + 1; // +1 for newline
}

let before418 = openParenPositions.filter(p => p < lineEnd418);
let after418 = openParenPositions.filter(p => p >= lineEnd418);

console.log('Outside-string parens before line 418:', before418.length);
console.log('Outside-string parens after line 418:', after418.length);

if (before418.length > 0) {
  console.log('Last paren before line 418 at position', before418[before418.length-1]);
  const pos = before418[before418.length-1];
  console.log('Context:', code.substring(Math.max(0,pos-60), pos+60));
}

// Now let's check balance: count all ) that are outside strings
let closeParenPositions = [];
inSingle = false; inDouble = false;
for (let i = 0; i < code.length; i++) {
  const ch = code[i];
  const prev = i > 0 ? code[i-1] : '';
  if (!inDouble && ch === "'" && prev !== '\\') inSingle = !inSingle;
  if (!inSingle && ch === '"' && prev !== '\\') inDouble = !inDouble;
  if (!inSingle && !inDouble && ch === ')') closeParenPositions.push(i);
}

console.log('Outside-string close parens:', closeParenPositions.length);
console.log('Balance:', openParenPositions.length - closeParenPositions.length);

// Find which ( doesn't have a matching )
if (openParenPositions.length > closeParenPositions.length) {
  // Try to match them
  let closes = [...closeParenPositions];
  let unmatchedOpens = [];
  for (let pos of openParenPositions) {
    let found = false;
    for (let c of closes) {
      if (c > pos) {
        found = true;
        closes.splice(closes.indexOf(c), 1);
        break;
      }
    }
    if (!found) unmatchedOpens.push(pos);
  }
  console.log('Unmatched opens:', unmatchedOpens.length);
  if (unmatchedOpens.length > 0) {
    console.log('Last unmatched at pos', unmatchedOpens[unmatchedOpens.length-1]);
    const pos = unmatchedOpens[unmatchedOpens.length-1];
    const line = code.substring(0, pos).split('\n').length;
    console.log('Line', line);
    console.log('Context:', code.substring(Math.max(0,pos-60), pos+60));
  }
}
