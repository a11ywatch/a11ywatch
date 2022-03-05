use clap::{Parser, Subcommand};

#[derive(Subcommand)]
pub enum Commands {
    /// Build the project on the local machine [defaults to docker runtime].
    BUILD {
        /// target machine local.
        #[clap(short, long)]
        local: bool,
    },
    START {
        /// start the local machine.
        #[clap(short, long)]
        local: bool,
    },
    // DEPLOY {
    //     /// deploy backend and frontend service.
    //     #[clap(short, long)]
    //     all: bool,
    //     /// deploy frontend service.
    //     #[clap(short, long)]
    //     frontend: bool,
    //     /// deploy backend service.
    //     #[clap(short, long)]
    //     backend: bool,
    // },
    // TERMINATE {
    //     /// terminate backend and frontend service.
    //     #[clap(short, long)]
    //     all: bool,
    //     /// terminate frontend service.
    //     #[clap(short, long)]
    //     frontend: bool,
    //     /// terminate backend service.
    //     #[clap(short, long)]
    //     backend: bool,
    // },
}

/// program to build, deploy, and run a11ywatch.
#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    /// Build sub commands
    #[clap(subcommand)]
    pub command: Option<Commands>,
    // /// Run a one off container on the local machine.
    // #[clap(short, long, default_value = "", required = false)]
    // pub run: String,
}
