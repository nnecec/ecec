use std::collections::HashMap;

pub fn get_default_registries() -> HashMap<&'static str, &'static str> {
    HashMap::from([
        ("npm", "https://registry.npmjs.org"),
        ("yarn", "https://registry.yarnpkg.com"),
        ("taobao", "https://registry.npmmirror.com"),
        ("tencent", "https://mirrors.cloud.tencent.com/npm/"),
    ])
}
