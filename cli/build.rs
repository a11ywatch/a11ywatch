#[cfg(feature = "grpc")]
fn main() -> Result<(), Box<dyn std::error::Error>> {
    use std::env;
    use std::process::Command;
    let out_dir = env::var("OUT_DIR").unwrap();

    Command::new("npm")
        .args(["i", "--prefix", &out_dir, "@a11ywatch/protos"])
        .output()
        .expect("failed to execute npm install process");

    tonic_build::compile_protos(format!(
        "{}/node_modules/@a11ywatch/protos/crawler.proto",
        out_dir
    ))?;
    tonic_build::compile_protos(format!(
        "{}/node_modules/@a11ywatch/protos/apicore.proto",
        out_dir
    ))?;
    tonic_build::compile_protos(format!(
        "{}/node_modules/@a11ywatch/protos/health.proto",
        out_dir
    ))?;

    Ok(())
}

#[cfg(not(feature = "grpc"))]
fn main() -> Result<(), Box<dyn std::error::Error>> {
    Ok(())
}
