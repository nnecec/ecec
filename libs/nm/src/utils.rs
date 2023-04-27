use ini::Ini;
use std::env;
use std::path::Path;

pub fn read_ini(ini_file: &str) -> Result<Ini, ini::Error> {
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

    Ini::load_from_file(&path)
}

pub fn get_registry_list(content: Ini) {
    content.section("registry")
}
