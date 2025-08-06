# Convex Hull Visualiser

## Intro
This is a simple webgl + react application that generates a set of points in 3d
spaces and then computes and renders the convex hull of those points.

Written in Rust and Clojurescript.

## Pre-requisites
Ensure you have `rust` and `pnpm` installed.

``` sh
cargo install wasm-pack
pnpm install -g shadowcljs
```

## Build
```sh
wasm-pack build
pnpm i # Have to re-install deps to include wasm files
shadowcljs compile app
```
