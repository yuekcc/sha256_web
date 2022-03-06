import { hexUint8Array, makeSha256Sum } from './dist/index.esm.js';

function createFileChunks(file, size = 1024 * 1024) {
  const chunks = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }

  return chunks;
}

let hash = null;

!(async () => {
  const resp = await fetch('testdata/15mb.bin');
  const blob = await resp.blob();
  const chunks = createFileChunks(blob);

  console.time('wasm sha256sum');
  const hasher = await makeSha256Sum();
  for (const chunk of chunks) {
    const buf = await chunk.file.arrayBuffer();
    hasher.append(new Uint8Array(buf));
  }

  hash = hasher.end();
})().finally(() => {
  console.timeEnd('wasm sha256sum');
  document.body.textContent = hexUint8Array(hash);
});
