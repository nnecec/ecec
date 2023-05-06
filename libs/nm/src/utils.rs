use ini::Ini;
use std::collections::HashMap;
use std::env;
use std::path::Path;

use crate::constant::get_default_registries;

pub fn read_ini(ini_file: &str) -> Ini {
    let os = env::consts::OS;
    let os_path;
    if os == "windows" {
        os_path = "USERPROFILE";
    } else {
        os_path = "HOME";
    }
    let home_path = env::var(os_path).unwrap();
    let path_buf = Path::new(&home_path.to_owned()).join(ini_file);
    let path = path_buf.as_path().display().to_string();

    Ini::load_from_file(&path).unwrap()
}

pub fn get_registries() -> HashMap<&'static str, &'static str> {
    let content = read_ini(".nrmrc");
    let mut registries = get_default_registries();

    for (section, prop) in content.iter() {
        for (k, v) in prop.iter() {
            if k == "registry" {
                registries.insert(section.unwrap_or("unknown"), v);
            }
        }
    }
    registries

    // println!("");
    // for (name, url) in registries {
    //     let star = "➡️ ";
    //     println!("{:1} {} {:-<width$} {}", star, name, "-", url, width = 3);
    // }
    // println!("");;
}
