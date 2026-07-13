try {
  const fs = require('fs');
  const code = fs.readFileSync('js/data.js', 'utf8');
  new Function(code);
} catch(e) {
  console.log(e.stack);
}
