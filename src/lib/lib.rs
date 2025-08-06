mod chull;
mod geometry;

use geometry::Vec3;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    log(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn add(a: f32, b: f32) -> f32 {
    a + b
}

#[wasm_bindgen]
pub fn chull(points_buf: Vec<f32>) -> Vec<f32> {
    let num_points = points_buf.len() / 3;

    let mut points = Vec::with_capacity(num_points);

    for i in 0..num_points {
        let v: Vec3 = Vec3::new(
            points_buf[3 * i],
            points_buf[3 * i + 1],
            points_buf[3 * i + 2],
        );
        points.push(v);
    }

    let faces = chull::chull(points);
    let mut faces_vert_buf = Vec::new();

    for face in faces {
        for vert in face {
            faces_vert_buf.extend_from_slice(&vert.as_slice());
        }
    }

    faces_vert_buf
}
