#[cfg(not(feature = "grpc"))]
pub mod rest;

#[cfg(feature = "grpc")]
pub mod grpc;

#[cfg(not(feature = "grpc"))]
pub(crate) use self::rest::ApiClient;

#[cfg(feature = "grpc")]
pub(crate) use self::grpc::ApiClient;
