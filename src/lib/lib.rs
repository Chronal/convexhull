mod vec;
mod geometry;
mod convex_hull;
mod graph;

use vec::Vec3;

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
extern "C" {

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    let string = format!("Hello, {}", name);
    alert(&string);
}

#[wasm_bindgen]
pub fn puts(s: &str) {
    log(s);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let v1 = Vec3::new(1.0, 0.0, 0.0);
        assert_eq!(v1.len(), 1.0);
    }
}
