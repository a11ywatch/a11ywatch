fn main() -> Result<(), Box<dyn std::error::Error>> {
    use std::env;
    use std::process::Command;
    let out_dir = env::var("OUT_DIR").unwrap();

    Command::new("npm")
        .args(["i", "--prefix", &out_dir, "@a11ywatch/protos@0.3.3"])
        .output()
        .expect("failed to execute npm install process");

    tonic_build::configure()
        .build_server(false)
        .extern_path(".google.protobuf.Struct", "::prost::alloc::string::String")
        .type_attribute("apicore.Page", "#[derive(serde::Deserialize, serde::Serialize)]")
        .type_attribute("apicore.Script", "#[derive(serde::Deserialize, serde::Serialize)]")
        .type_attribute("apicore.Issue", "#[derive(serde::Deserialize, serde::Serialize)]")
        .type_attribute(
            "apicore.IssueInfo",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
        .type_attribute(
            "apicore.PageLoadTime",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
        .type_attribute(
            "apicore.ScriptMeta",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
        .type_attribute(
            "apicore.IssueMeta",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
        .compile(
            &[format!(
                "{}/node_modules/@a11ywatch/protos/apicore.proto",
                &out_dir
            )],
            &[&out_dir],
        )?;

    tonic_build::compile_protos(format!(
        "{}/node_modules/@a11ywatch/protos/crawler.proto",
        out_dir
    ))?;

    tonic_build::compile_protos(format!(
        "{}/node_modules/@a11ywatch/protos/health.proto",
        out_dir
    ))?;

    Ok(())
}
