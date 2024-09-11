use std::ops::{Add, AddAssign, Mul, MulAssign, Sub, SubAssign};

pub struct Vec3 {
    x: f64,
    y: f64,
    z: f64,
}

impl Vec3 {
    pub fn new(x: f64, y: f64, z: f64) -> Self {
        Vec3 { x, y, z }
    }

    pub fn len(&self) -> f64 {
        (self.x * self.x + self.y * self.y + self.z * self.z).sqrt()
    }

    pub fn dot(&self, vec: &Vec3) -> f64 {
        self.x * vec.x + self.y * vec.y + self.z * vec.z
    }

    pub fn scale(&self, scalar: f64) -> Self {
        Vec3::new(scalar * self.x, scalar * self.y, scalar * self.z)
    }

    pub fn add(&self, value: f64) -> Self {
        Vec3::new(value + self.x, value + self.y, value + self.z)
    }

    pub fn normalise(&self) -> Self {
        let len = self.len();
        if len.abs() < f64::EPSILON {
            Vec3::zero_vector()
        } else {
            Vec3::new(self.x / len, self.y / len, self.z / len)
        }
    }

    pub fn zero_vector() -> Self {
        Vec3::new(0.0, 0.0, 0.0)
    }

    pub fn cross(&self, vec: &Self) -> Self {
        Vec3::new(
            self.y * vec.z - self.z * vec.y,
            self.z * vec.x - self.x * vec.z,
            self.x * vec.y - self.y * vec.x
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

impl Mul for Vec3 {
    type Output = Self;
    fn mul(self, rhs: Self) -> Self {
        Vec3::new(self.x * rhs.x, self.y * rhs.y, self.z * rhs.z)
    }
}

impl MulAssign for Vec3 {
    fn mul_assign(&mut self, rhs: Self) {
        self.x *= rhs.x;
        self.y *= rhs.y;
        self.z *= rhs.z;
    }
}
