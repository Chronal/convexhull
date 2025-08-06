mod plane;
mod vec;

pub use vec::Vec3;
pub type Vertex = Vec3;
pub type Face = [Vertex; 3];

pub struct Plane {
    point: Vertex,
    normal: Vec3,
}

impl Plane {
    fn new() -> Self {
        todo!();
    }

    fn from_vectors() -> Self {
        todo!();
    }
}
