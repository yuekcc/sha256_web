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

export async function stringToUint8Array(str) {
  if (Buffer && typeof Buffer.from === 'function') {
    return Buffer.from(str, 'utf-8');
  }

  const resp = new Response(str);
  const buf = await resp.arrayBuffer();
  return new Uint8Array(buf);
}

let _inited = false;

/**
 * sha256 hash
 * @param {Uint8Array} uint8Arr
 * @returns {Uint8Array}
 */
export async function sha256sum(uint8Arr) {
  if (!_inited) {
    await init(sha256sumCoreBinary);
    _inited = true;
  }

  return Sha256SumCore.hash(uint8Arr);
}

export const Sha256Sum = Sha256SumCore;
