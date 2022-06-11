/// Rust REST client
pub mod javascript;
/// Go REST client
pub mod go;
/// Javascript REST client
pub mod rust;

pub(crate) use self::rust::{build_rust};
pub(crate) use self::go::{build_go};
pub(crate) use self::javascript::{build_javascript};
