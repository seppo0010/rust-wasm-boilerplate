build: reverse.wasm

reverse.wasm:
	cargo build --target wasm32-unknown-unknown --release
	cp target/wasm32-unknown-unknown/release/reverse.wasm $@

.PHONY: build
