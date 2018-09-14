var isNode=new Function("try {return this===global;}catch(e){return false;}");

if (isNode()) {
  bundle = require('./bundle');
  path = require('path');
} else {
  path = { dirname: () => '.' }
}

bundle.fetchAndInstantiate(path.dirname(isNode() ? __filename : '') + "/reverse.wasm", {})
.then(mod => {

  const str = 'hello world';
  let buf = bundle.newString(mod.exports, str); // manual alloc
  let outptr = mod.exports.reverse(buf); // library call
  mod.exports.dealloc_str(buf); // manual free
  const result = bundle.copyCStr(mod.exports, outptr) // read c string into js string
  console.log(result);
});

