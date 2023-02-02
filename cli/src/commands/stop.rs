use crate::fs::TempFs;
use crate::launchers::docker;
use crate::INCLUDE_FRONTEND;
use std::env;
use std::process::Command;

#[derive(Debug, Default)]
pub struct Stop {}

impl Stop {
    pub(crate) fn process(local: &bool) -> bool {
        let file_manager = TempFs::new();
        let frontend: bool = match env::var(INCLUDE_FRONTEND) {
            Ok(val) => val == "true",
            Err(_) => false,
        };
        if *local {
            // match Command::new("pkill").args(["mongod-*"]).status() {
            //     Ok(_) => {}
            //     _ => {
            //         println!("mongo already shutdown.");
            //     }
            // };

            // todo: control redis, mongodb, chrome shutdowns
            match Command::new("kill-port")
                .args(["3000", "3280", "50051", "50052", "50053", "50055"])
                .status()
            {
                Ok(_) => {}
                _ => {
                    println!("Failed to execute kill-port command. Try to install it first with the command `npm i kill-port -g`.");
                }
            };

            match Command::new("pkill").args(["website_crawler"]).status() {
                Ok(_) => {}
                _ => {
                    println!("crawler already shutdown.");
                }
            };
        } else {
            docker::stop_service(&frontend, &file_manager);
        }

        *local
    }
}
