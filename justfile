release: build-core build-esm build-commonjs

build-core:
  wasm-pack build --release --out-dir pkg --target web
  ls -alh pkg

build-esm:
  npx esbuild --outfile=dist/index.esm.js --loader:.wasm=binary --bundle --format=esm web/index.js
  ls -alh dist

build-commonjs:
  #!/bin/sh
  npx esbuild --outfile=dist/index.js \
    --loader:.wasm=binary \
    --bundle \
    --format=cjs \
    --platform=node \
    --target=node14 \
    web/index.js
  ls -alh dist