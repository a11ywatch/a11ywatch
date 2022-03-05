use clap::{Parser, Subcommand};

#[derive(Subcommand)]
pub enum Commands {
    /// Build the project on the local machine [defaults to docker runtime].
    BUILD {
        /// create target local machine non docker if true.
        #[clap(short, long)]
        local: bool,
    },
    /// Start the application on the local machine [defaults to docker runtime].
    START {
        /// start the local machine non docker if true.
        #[clap(short, long)]
        local: bool,
    },
    /// Deploy the build on remote infrastructure
    DEPLOY {
        /// deploy backend and frontend service. [Default: GCP]
        #[clap(short, long)]
        all: bool,
        /// deploy frontend service.
        #[clap(short, long)]
        frontend: bool,
        /// deploy backend service.
        #[clap(short, long)]
        backend: bool,
    },
    /// Destroy the build on remote infrastructure. [Default: GCP]
    TERMINATE {
        /// terminate backend and frontend service.
        #[clap(short, long)]
        all: bool,
        /// terminate frontend service.
        #[clap(short, long)]
        frontend: bool,
        /// terminate backend service.
        #[clap(short, long)]
        backend: bool,
    },
}

/// program to build, deploy, and run a11ywatch.
#[derive(Parser)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    /// Build sub commands
    #[clap(subcommand)]
    pub command: Option<Commands>,
}
