use crate::utils;

pub fn list() {
    match utils::read_ini(&String::from(".nrmrc")) {
        Ok(ini) => {
            let registries = utils::get_registries(&ini);
            println!("");
            for (name, url) in registries {
                let star = " ";
                println!(
                    "{:1} {} {:-<width$} {}",
                    star,
                    name,
                    "-",
                    url,
                    width = 3
                );
            }
            println!("");
        }
        Err(e) => {
            println!("Read .nrmrc got an issue: {}", e);
        }
    }
}
