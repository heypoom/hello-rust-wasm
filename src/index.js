import wasm from './main.rs'

const MY_KEY = "IS_RUST_GREAT"

async function main() {
  const lib = await wasm
  const result = lib.hello()

  console.log('->', result)
  console.log("Is Rust Great?", localStorage.getItem(MY_KEY))
}

main()

