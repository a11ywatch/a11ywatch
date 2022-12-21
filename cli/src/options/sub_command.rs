use clap::Subcommand;

#[derive(Subcommand)]
pub enum Commands {
    /// Build the project on the local machine [defaults to docker runtime]
    BUILD {
        /// create machine with frontend client
        #[clap(short, long)]
        frontend: bool,
        /// create target local machine non docker if true
        #[clap(short, long)]
        local: bool,
        /// Ugrade docker images for container on start.
        #[clap(short, long)]
        upgrade: bool,
        /// standalone container [defaults to true]
        #[clap(short, long)]
        standalone: bool,
    },
    /// Start the application on the local machine [defaults to docker runtime]
    START {
        /// start the local machine with frontend client
        #[clap(short, long)]
        frontend: bool,
        /// start the local machine non docker if true
        #[clap(short, long)]
        local: bool,
        /// Ugrade docker images for container on start.
        #[clap(short, long)]
        upgrade: bool,
        /// standalone container [defaults to true]
        #[clap(short, long)]
        standalone: bool,
        /// use the bun runtime - requires local flag as well [BETA].
        #[clap(short, long)]
        bun: bool,
    },
    /// Stop the project on the local machine [defaults to docker runtime]
    STOP {
        /// stop the local machine with frontend client.
        #[clap(short, long)]
        frontend: bool,
        /// stop the local machine client
        #[clap(short, long)]
        local: bool,
    },
    /// Single page scan a website url for issues.
    SCAN {
        /// target url to scan
        #[clap(short, long)]
        url: String,
        /// whether to use the a11ywatch external api
        #[clap(short, long)]
        external: bool,
        /// save the results of the scan to tmp
        #[clap(short, long)]
        save: bool,
        /// attempt to fix the code being applied with recommendations
        #[clap(short, long)]
        fix: bool,
        #[clap(long)]
        /// disable stdout (useful for CI usage and large outputs)
        noout: bool
    },
    /// Site wide scan a website url for issues.
    CRAWL {
        /// target url to scan
        #[clap(short, long)]
        url: String,
        /// whether to use the a11ywatch external api
        #[clap(short, long)]
        external: bool,
        /// save the results of the scan to tmp
        #[clap(short, long)]
        save: bool,
        /// Include subdomains
        #[clap(short = 'S', long)]
        subdomains: bool,
        /// Include different TLD extensions matching hostname
        #[clap(short, long)]
        tld: bool,
        /// Do not respect the robots.txt file
        #[clap(short, long)]
        norobo: bool,
        /// attempt to fix the code being applied with recommendations
        #[clap(short, long)]
        fix: bool,
        /// enable log output on crawl
        #[clap(short, long)]
        debug: bool,
        #[clap(long)]
        /// disable stdout (useful for CI usage and large outputs)
        noout: bool
    },
    /// Extract results in formats for platforms
    EXTRACT {
        /// platform to use like github
        #[clap(short, long)]
        platform: String,
        /// pass fail list style
        #[clap(short, long)]
        list: bool,
    }
}
