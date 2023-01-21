fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::configure()
        .build_server(false)
        .extern_path(".google.protobuf.Struct", "::prost::alloc::string::String")
        .type_attribute(
            "apicore.Page",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
        .type_attribute(
            "apicore.Script",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
        .type_attribute(
            "apicore.Issue",
            "#[derive(serde::Deserialize, serde::Serialize)]",
        )
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
            &["proto/apicore.proto"],
            &["proto"],
        )?;

    tonic_build::compile_protos("proto/crawler.proto")?;
    tonic_build::compile_protos("proto/health.proto")?;

    Ok(())
}
