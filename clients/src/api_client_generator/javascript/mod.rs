extern crate convert_case;
pub mod build_javascript;
pub mod build_request;
pub mod build_controller;

pub(crate) use self::build_javascript::{build_javascript};
pub(crate) use self::build_request::{generate_request};
pub(crate) use self::build_controller::{generate_controller, generate_controller_imports};

