# sha256_web

基于 [sha2](https://docs.rs/sha2) 库的 sha256sum。

## 使用

```js
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
```

## 性能

计算 package-lock.json（90k）的 sha256sum：

```sh
$ node index.js 
wasm sha256sum: 18.096ms
59abc371169e5b4454e88088b6dfcb60b27ce93c53eb16fb21e589d3b648aa1e
cryptojs sha256sum: 29.839ms
hash with crypto: 59abc371169e5b4454e88088b6dfcb60b27ce93c53eb16fb21e589d3b648aa1e

$ time sha256sum.exe package-lock.json
59abc371169e5b4454e88088b6dfcb60b27ce93c53eb16fb21e589d3b648aa1e *package-lock.json

real    0m0.040s
user    0m0.000s
sys     0m0.031s
```

大文件没有测试，也没有支持分段的 hash。

## License

MIT
