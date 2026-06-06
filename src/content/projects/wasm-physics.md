---
title: "WASM Physics Solver"
tags: ["C++", "WebAssembly", "Simulation"]
thumbnail: "https://placehold.co/800x600/1A1A18/C4A14A?text=Placeholder"
summary: "A rigid body physics engine ported to WebAssembly for browser-based interactive simulations."
video: null
---
## The Problem
JavaScript physics engines struggle with complex collisions involving hundreds of bodies.

## The Solution
Ported a custom C++ physics engine using Emscripten, enabling predictable and fast simulation loops directly in the browser.

## The Impact
Adopted by two web-based puzzle games, achieving stable 60fps with 500+ active physics bodies.
