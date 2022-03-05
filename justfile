release: build-core build-npm-pkg

build-core:
  wasm-pack build --release --out-dir pkg --target web
  ls -alh pkg

build-npm-pkg:
  npx esbuild --outdir=dist --loader:.wasm=binary --bundle --format=esm web/index.js
  ls -alh dist
