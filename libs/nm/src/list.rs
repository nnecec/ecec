use crate::utils;

pub fn list() {
  match utils::read_ini(&String::from(".npmrc")) {
    Ok(ini) => {
      let current_registry = utils::get_registry_list(ini);
      print!("{:#?}", current_registry);
    }
    Err(e) => {
      println!("{}", e);
    }
  }
}
