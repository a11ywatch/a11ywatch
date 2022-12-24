use crate::fs::temp::TempFs;
use crate::launchers::docker;
use crate::INCLUDE_FRONTEND;
use std::env;
use std::process::Command;

#[derive(Debug, Default)]
pub(crate) struct Build {}

impl Build {
    /// run docker build command with system or npm install for the sidecar.
    pub(crate) fn process(local: &bool, standalone: &bool) {
        let mut file_manager = TempFs::new();
        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };

        if *local {
            Command::new("npm")
                .args(["i", "@a11ywatch/a11ywatch", "-g"])
                .status()
                .expect("Failed to execute command - npm install @a11ywatch/a11ywatch command");

            let web_folder_tmp = format!("{}/web_tmp", file_manager.get_temp_dir());
            let web_folder = format!("{}/web", file_manager.get_temp_dir());

            if frontend {
                // install the codebase via npm for versioning ability
                Command::new("npm")
                    .args(["i", "--prefix", &web_folder_tmp, "@a11ywatch/web"])
                    .status()
                    .expect("Failed to execute npm i command inside @a11ywatch/web!");

                if cfg!(windows) {
                    Command::new("copy")
                        .args([
                            &format!("{}/{}", &web_folder_tmp, "node_modules/@a11ywatch/web/"),
                            &web_folder,
                        ])
                        .status()
                        .expect("Failed to execute copy command!");

                    Command::new("rmdir")
                        .args(["-s", &format!("{}", &web_folder_tmp)])
                        .status()
                        .expect("Failed to execute rmdir command!");
                } else if cfg!(unix) {
                    Command::new("cp")
                        .args([
                            "-R",
                            &format!("{}/{}", &web_folder_tmp, "node_modules/@a11ywatch/web/"),
                            &web_folder,
                        ])
                        .status()
                        .expect("Failed to execute cp command!");
                    Command::new("rm")
                        .args(["-R", &format!("{}", &web_folder_tmp)])
                        .status()
                        .expect("Failed to execute rm command!");
                };

                // force install @types/react issues apollo deprecated version. All other modules should be pinned for security.
                Command::new("npm")
                    .args([
                        "--prefix",
                        &format!("{}/", &web_folder),
                        "install",
                        "./",
                        "--force",
                    ])
                    .status()
                    .expect("Failed to execute @a11ywatch/web i command!");

                Command::new("npm")
                    .args(["run", "build", "--prefix", &web_folder])
                    .status()
                    .expect("Failed to execute @a11ywatch/web build command!");
            }
        } else {
            file_manager.create_env_file().unwrap();
            file_manager
                .create_compose_backend_file(standalone)
                .unwrap();
            if frontend {
                file_manager.create_compose_frontend_file().unwrap();
            }
            docker::build_backend(&file_manager);
        }
    }

    /// run docker build backend to upgrade images or re-install the sidecar@latest.
    pub(crate) fn upgrade(local: &bool, standalone: &bool) {
        let mut file_manager = TempFs::new();

        if *local {
            Command::new("npm")
                .args(["i", "@a11ywatch/a11ywatch", "-g"])
                .status()
                .expect("Failed to execute command - npm install @a11ywatch/a11ywatch command");
        } else {
            let frontend: bool = match env::var(INCLUDE_FRONTEND) {
                Ok(val) => val == "true",
                Err(_) => false,
            };
            file_manager
                .create_compose_backend_file(standalone)
                .unwrap();
            if frontend {
                file_manager.create_compose_frontend_file().unwrap();
            }
            docker::upgrade(&file_manager);
        }
    }
}
