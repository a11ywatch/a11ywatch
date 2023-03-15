#[cfg(feature = "litemode")]
pub mod grpc;
#[cfg(not(feature = "litemode"))]
pub mod rest;

#[cfg(feature = "litemode")]
pub(crate) use self::grpc::ApiClient;
#[cfg(not(feature = "litemode"))]
pub(crate) use self::rest::ApiClient;
