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

计算 3mb.bin（2884194）的 sha256sum：

机器：

- CPU: AMD Ryzen 5 2500U with Radeon Vega Mobile Gfx
- RAM: 8GB
- OS: Windows 10 21H2 (19044.1526)

**nodejs**

```sh
$ node -v
v16.14.0
$ node index.js
wasm sha256sum: 34.715ms
129fe531372727ccbc922a8845168941f91d0762e6d26dea24acbe04cc054996
cryptojs sha256sum: 97.632ms
hash with crypto: 129fe531372727ccbc922a8845168941f91d0762e6d26dea24acbe04cc054996
```

**浏览器**

```sh
> navigator.userAgent
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
wasm sha256sum: 155.39306640625 ms
```

**sha256sum 命令**

```sh
$ sha256sum.exe --version
sha256sum (GNU coreutils) 8.32
$ time sha256sum.exe testdata/3mb.bin
129fe531372727ccbc922a8845168941f91d0762e6d26dea24acbe04cc054996 *testdata/3mb.bin

real    0m0.051s
user    0m0.015s
sys     0m0.046s
```

## License

MIT
