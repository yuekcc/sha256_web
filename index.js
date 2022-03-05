const { hexUint8Array, sha256sum } = require('./dist/index');
const fs = require('fs');
const { Crypto } = require('cryptojs');

!(async () => {
  const testdata = fs.readFileSync('package-lock.json', 'utf-8');

  console.time('wasm sha256sum');
  const result = await sha256sum(Buffer.from(testdata));
  console.timeEnd('wasm sha256sum');

  console.log(hexUint8Array(result));

  console.time('cryptojs sha256sum');
  const hash = Crypto.SHA256(testdata);
  console.timeEnd('cryptojs sha256sum');

  console.log('hash with crypto:', hash);
})();
