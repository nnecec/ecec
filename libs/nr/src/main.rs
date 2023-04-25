use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    /// Optional name to operate on
    name: Option<String>,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// View registries list.
    List {},
    /// Add new registry.
    Add {
        name: Option<String>,
        url: Option<String>,
    },
    /// Remove registry.
    Remove { name: Option<String> },
    /// Use selected registry.
    Use { name: Option<String> },
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::List {}) => {
            print!("Listing all registries...");
        }
        Some(Commands::Add { name, url }) => {
            print!("Adding {name:?}: {url:?}");
        }
        Some(Commands::Use { name }) => {
            print!("Using {name:?}");
        }
        Some(Commands::Remove { name }) => {
            print!("Removing {name:?}");
        }
        None => {}
    }
}
