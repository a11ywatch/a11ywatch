use std::path::Path;
use std::process::Command;

/// make sure runtime module exist. License must be compatible.
pub fn assure_module_exist(module: &str) {
    let bin_name = if module == "ripgrep" { "rg" } else { module };
    let path =
        Path::new(&dirs::home_dir().unwrap_or_default()).join(format!(".cargo/bin/{bin_name}"));

    if !Path::new(&path).exists() {
        println!("Installing required rust {module} for code fix...");
        Command::new("cargo")
            .args(["install", module])
            .status()
            .expect("Failed to execute cargo install {module}");
    }
}
