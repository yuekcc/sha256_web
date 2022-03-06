const { hexUint8Array, sha256sum } = require('./dist/index');
const fs = require('fs');
const { Crypto } = require('cryptojs');

!(async () => {
  const testdata = fs.readFileSync('testdata/3mb.bin');
  // const _testdata = Buffer.from(testdata);

  console.time('wasm sha256sum');
  const result = await sha256sum(testdata);
  console.timeEnd('wasm sha256sum');

  console.log(hexUint8Array(result));

  console.time('cryptojs sha256sum');
  const hash = Crypto.SHA256(testdata);
  console.timeEnd('cryptojs sha256sum');

  console.log('hash with crypto:', hash);
})();
