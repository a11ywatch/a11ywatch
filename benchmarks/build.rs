use std::process::Command;

/// build executables for bench marks and init steps
pub fn main() {
    // make sure A11yWatch server is up
    Command::new("a11ywatch")
        .arg("start")
        .arg("-f")
        .output()
        .expect("a11ywatch start failed");
}
