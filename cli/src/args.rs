use std::collections::HashMap;

// simple parse basic args replace with CLAP
pub fn parse_args(mut args: impl Iterator<Item = String>) -> HashMap<String, String> {
    let mut flags = HashMap::new();
    
    while let Some(arg) = args.next() {
        if let Some(flag) = arg.strip_prefix("-") {
            if let Some(option) = flag.strip_prefix("-") {
                flags.insert(option.into(), args.next().unwrap_or_default());
            } else {
                for fchar in flag.chars() {
                    flags.insert(fchar.into(), String::from("1"));
                }
            }
        }
    }

    flags
}