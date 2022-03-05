import init, { Sha256Sum as Sha256SumCore } from '../pkg/sha256_web.js';
import sha256sumCoreBinary from '../pkg/sha256_web_bg.wasm';

function i2hex(i) {
  return ('0' + i.toString(16)).slice(-2);
}

export function hexUint8Array(arr) {
  if (arr.length === 0) {
    return null;
  }

  return arr.reduce((memo, i) => memo + i2hex(i), '');
}

async function stringToUint8Array(str) {
  const resp = new Response(str);
  const buf = await resp.arrayBuffer();
  return new Uint8Array(buf);
}

let _inited = false;

/**
 * sha256 hash
 * @param {Uint8Array|string} uint8ArrayOrString
 * @returns {Uint8Array}
 */
export async function sha256sum(uint8ArrayOrString) {
  let data = uint8ArrayOrString;
  if (typeof uint8ArrayOrString === 'string') {
    data = stringToUint8Array(uint8ArrayOrString);
  }

  if (!_inited) {
    await init(sha256sumCoreBinary);
    _inited = true;
  }

  return Sha256SumCore.hash(data);
}

export const Sha256Sum = Sha256SumCore;
