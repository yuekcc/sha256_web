use std::cell::Cell;

use sha2::{Digest, Sha256};
use wasm_bindgen::prelude::*;

// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Sha256Sum {
    hasher: Cell<Sha256>,
}

#[wasm_bindgen]
impl Sha256Sum {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Sha256Sum {
            hasher: Cell::new(Sha256::new()),
        }
    }

    pub fn hash(data: &[u8]) -> Vec<u8> {
        let hasher = Self::new();
        hasher.append(data);
        hasher.end()
    }

    pub fn append(&self, data: &[u8]) {
        let mut hasher = self.hasher.take();
        hasher.update(data);
        self.hasher.set(hasher);
    }

    pub fn end(&self) -> Vec<u8> {
        let hasher = self.hasher.take();
        hasher.finalize().to_vec()
    }
}

#[cfg(test)]
mod test {
    use hex::ToHex;

    #[test]
    fn test_sha256sum_once() {
        let result = super::Sha256Sum::hash(b"hello, world");
        let expect = "09ca7e4eaa6e8ae9c7d261167129184883644d07dfba7cbfbc4c8a2e08360d5b";
        assert_eq!(result.encode_hex::<String>(), expect);
    }

    #[test]
    fn test_sha256sum_chained() {
        let hash = &super::Sha256Sum::new();
        hash.append(b"hello");
        hash.append(b", ");
        hash.append(b"world");

        let result = hash.end();
        let expect = "09ca7e4eaa6e8ae9c7d261167129184883644d07dfba7cbfbc4c8a2e08360d5b";
        assert_eq!(result.encode_hex::<String>(), expect);
    }
}
