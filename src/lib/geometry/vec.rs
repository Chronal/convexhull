use std::ops::{Add, AddAssign, Sub, SubAssign};

#[derive(Copy, Clone, Debug)]
pub struct Vec3 {
    x: f32,
    y: f32,
    z: f32,
}

impl Vec3 {
    pub fn as_slice(&self) -> [f32; 3] {
        [self.x, self.y, self.z]
    }

    pub fn new(x: f32, y: f32, z: f32) -> Self {
        Vec3 { x, y, z }
    }

    pub fn len(&self) -> f32 {
        (self.x * self.x + self.y * self.y + self.z * self.z).sqrt()
    }

    pub fn dist(&self, other_point: Self) -> f32 {
        let mut d = other_point.clone();
        d -= *self;
        d.len()
    }

    pub fn dot(&self, vec: &Vec3) -> f32 {
        self.x * vec.x + self.y * vec.y + self.z * vec.z
    }

    pub fn scale(&mut self, scalar: f32) -> &Self {
        self.x *= scalar;
        self.y *= scalar;
        self.z *= scalar;
        self
    }

    pub fn scaled(&self, scalar: f32) -> Self {
        Vec3::new(scalar * self.x, scalar * self.y, scalar * self.z)
    }

    pub fn normalise(&mut self) -> &Self {
        let len = self.len();
        if len.abs() > f32::EPSILON {
            self.x /= len;
            self.y /= len;
            self.z /= len;
        }
        self
    }

    pub fn normalised(&self) -> Self {
        let len = self.len();
        if len.abs() <= f32::EPSILON {
            Vec3::zero_vector()
        } else {
            Vec3::new(self.x / len, self.y / len, self.z / len)
        }
    }

    pub fn zero_vector() -> Self {
        Vec3::new(0.0, 0.0, 0.0)
    }

    pub fn ones_vector() -> Self {
        Vec3::new(1.0, 1.0, 1.0)
    }

    pub fn cross(&self, vec: &Self) -> Self {
        Vec3::new(
            self.y * vec.z - self.z * vec.y,
            self.z * vec.x - self.x * vec.z,
            self.x * vec.y - self.y * vec.x,
        )
    }
}

impl Add for Vec3 {
    type Output = Self;

    fn add(self, rhs: Self) -> Self {
        Vec3::new(self.x + rhs.x, self.y + rhs.y, self.z + rhs.z)
    }
}

impl AddAssign for Vec3 {
    fn add_assign(&mut self, rhs: Self) {
        self.x += rhs.x;
        self.y += rhs.y;
        self.z += rhs.z;
    }
}

impl Sub for Vec3 {
    type Output = Self;

    fn sub(self, rhs: Self) -> Self {
        Vec3::new(self.x - rhs.x, self.y - rhs.y, self.z - rhs.z)
    }
}

impl SubAssign for Vec3 {
    fn sub_assign(&mut self, rhs: Self) {
        self.x -= rhs.x;
        self.y -= rhs.y;
        self.z -= rhs.z;
    }
}

impl Default for Vec3 {
    fn default() -> Self {
        Vec3::zero_vector()
    }
}
