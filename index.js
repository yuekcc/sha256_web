import { hexUint8Array, sha256sum } from './dist/index.js';

!(async () => {
  const resp = await fetch('testdata/70mb.bin');
  const buf = await resp.arrayBuffer();
  const data = new Uint8Array(buf);

  console.time('wasm sha256sum');
  const hash = await sha256sum(data);
  console.timeEnd('wasm sha256sum');

  document.body.textContent = hexUint8Array(hash);
})();
