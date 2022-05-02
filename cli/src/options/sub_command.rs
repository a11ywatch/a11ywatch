use clap::{Subcommand};

#[derive(Subcommand)]
pub enum Commands {
    /// Build the project on the local machine [defaults to docker runtime].
    BUILD {
        /// create machine with frontend client.
        #[clap(short, long)]
        frontend: bool,
        /// create target local machine non docker if true.
        #[clap(short, long)]
        local: bool,
    },
    /// Start the application on the local machine [defaults to docker runtime].
    START {
        /// start the local machine with frontend client.
        #[clap(short, long)]
        frontend: bool,
        /// start the local machine non docker if true [todo].
        #[clap(short, long)]
        local: bool,
    },
    /// Stop the project on the local machine [defaults to docker runtime].
    STOP {
        /// stop the local machine with frontend client.
        #[clap(short, long)]
        frontend: bool,
        /// create target local machine non docker if true.
        #[clap(short, long)]
        local: bool,
    },
    /// Deploy the build on remote infrastructure
    DEPLOY {
        /// deploy backend and frontend service. [defaults: GCP]
        #[clap(short, long)]
        all: bool,
        /// deploy frontend service.
        #[clap(short, long)]
        frontend: bool,
        /// deploy backend service.
        #[clap(short, long)]
        backend: bool,
    },
    /// Destroy the build on remote infrastructure. [defaults: GCP]
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
    /// Scan a website url for issues [only one page]
    SCAN {
        /// run site-wide scan: Must use API_KEY and Front-End Client to view results. [WIP].
        #[clap(short, long)]
        all: bool,
        /// whether to use the a11ywatch external api.
        #[clap(short, long)]
        external: bool,
        /// save the results of the scan to tmp.
        #[clap(short, long)]
        save: bool,
        /// target url to scan.
        #[clap(short, long)]
        url: String,
    },
    /// Extract results in formats for platforms
    EXTRACT {
        /// platform to use like github.
        #[clap(short, long)]
        platform: String,
    },
}
