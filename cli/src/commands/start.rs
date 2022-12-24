use crate::fs::TempFs;
use crate::launchers::docker;
use crate::{BUN, INCLUDE_FRONTEND};

use std::env;
use std::path::Path;
use std::process::Command;

#[derive(Debug, Default)]
pub struct Start {}

impl Start {
    /// start the a11ywatch application through docker or locally.
    pub fn process(local: &bool, standalone: &bool) -> bool {
        let mut file_manager = TempFs::new();
        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };

        if *local {
            let npm_path = Command::new("npm")
                .args(["root", "-g"])
                .output()
                .expect("Failed to execute npm root -g command!");
            let stdout = String::from_utf8_lossy(&npm_path.stdout);
            let stdout = stdout.clone().to_owned().to_string();
            let stdout = &stdout.trim().replace("\n", "");
            let node_dir_base = Path::new(&stdout);
            let node_dir = node_dir_base.join("@a11ywatch/a11ywatch");
            let node_dir = node_dir.display();

            let runtime: &str = match env::var(BUN) {
                Ok(val) => {
                    if val == "true" {
                        "bun"
                    } else {
                        "node"
                    }
                }
                Err(_) => "node",
            };

            if runtime == "bun" {
                Command::new("bun")
                    .args(["run", &format!("{}/{}", node_dir.to_string(), "server.js")])
                    .spawn()
                    .expect("Failed to execute @a11ywatch/a11ywatch bun command!");

                if frontend {
                    let web_folder = format!("{}/web", file_manager.get_temp_dir());

                    Command::new("bun")
                        .args(["run", "start", "--prefix", &web_folder.to_string()])
                        .spawn()
                        .expect("Failed to execute @a11ywatch/web start command! Try to run the command `a11ywatch build -l -f` first.");

                    if cfg!(windows) {
                        Command::new("explorer")
                            .args(["http://localhost:3000"])
                            .spawn()
                            .expect("Failed to execute explorer browser.");
                    } else if cfg!(unix) {
                        Command::new("open")
                            .args(["http://localhost:3000"])
                            .spawn()
                            .expect("Failed to execute open browser.");
                    }
                }
            } else {
                Command::new("npm")
                    .args(["run", "start", "--prefix", &node_dir.to_string()])
                    .spawn()
                    .expect("Failed to execute @a11ywatch/a11ywatch node command!");

                if frontend {
                    let web_folder = format!("{}/web", file_manager.get_temp_dir());

                    Command::new("npm")
                        .args(["run", "start", "--prefix", &web_folder.to_string()])
                        .spawn()
                        .expect("Failed to execute @a11ywatch/web start command! Try to run the command `a11ywatch build -l -f` first.");

                    // todo: detect different ports on start through env var
                    if cfg!(windows) {
                        Command::new("explorer")
                            .args(["http://localhost:3000"])
                            .spawn()
                            .expect("Failed to execute explorer browser.");
                    } else if cfg!(unix) {
                        Command::new("open")
                            .args(["http://localhost:3000"])
                            .spawn()
                            .expect("Failed to execute open browser.");
                    }
                }
            }
        } else {
            if frontend {
                file_manager.create_compose_frontend_file().unwrap();
            }
            file_manager
                .create_compose_backend_file(standalone)
                .unwrap();
            docker::start_service(&frontend, &file_manager);
        }

        *local
    }
}
