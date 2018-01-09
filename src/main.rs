#[macro_use]
extern crate stdweb;

use stdweb::web::*;

static SECRET_KEY: &str = "IS_RUST_GREAT";

fn hello() -> String {
    js! {
        console.log("Rust is Ready!");
    }

    let window = window();
    let storage = window.local_storage();

    storage.insert(SECRET_KEY, "Hell Friggin' Yeah!");

    let document = document();
    let header = document.query_selector("h1").unwrap();
    &header.set_text_content("Hello from Rust!!");
    
    js! {
        console.log(@{header});
    }

    format!("Yo Shawty")
}


fn main() {
    stdweb::initialize();

    js! {
        Module.exports.hello = @{hello};
        Module.exports.SECRET_KEY = @{SECRET_KEY};
    }

    stdweb::event_loop()
}

