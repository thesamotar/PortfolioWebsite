---
title: "Why I Rewrote My Renderer in Rust"
date: "2026-05-18"
tags: ["Featured"]
thumbnail: "/images/post_renderer.jpg"
snippet: "After three years of C++ pain, I migrated Spectra Engine to Rust. Here's what broke, what didn't, and why I'd do it again."
---
## The Breaking Point

It started with a segfault at 2am on a Tuesday. The third one that week. My C++ spectral renderer had grown to 15,000 lines, and the ownership semantics were a minefield. Every refactor introduced a new memory bug.

I'd been watching the Rust ecosystem mature for two years, and the WebGPU bindings (wgpu) had finally reached a level of stability that made the migration feasible.

## The Migration Strategy

I didn't do a big-bang rewrite. Instead, I built Rust bindings around the core math library first, validated numerical equivalence with property-based tests, then progressively replaced C++ modules one at a time.

The key insight was treating the BVH acceleration structure as the migration boundary. Everything above it (scene description, materials) could be ported independently from everything below it (ray traversal, intersection).

## What Broke

**The lifetime system nearly killed me.** My C++ renderer passed raw pointers freely between the scene graph, material system, and geometry buffers. Rust's borrow checker forced me to completely rethink ownership.

The solution was an arena allocator pattern — all geometry lives in a single arena, and nodes hold indices rather than references. This actually improved cache locality and boosted traversal performance by 15%.

**The build system was painful.** Mixing Rust, WASM, and the WebGPU shader pipeline required a custom build orchestrator. I ended up writing a small Rust build script that pre-compiles WGSL shaders and bundles them as static assets.

## What Didn't Break

The math. Rust's type system caught three subtle floating-point precision bugs during the port that had been silently producing incorrect renders in the C++ version for months.

## The Numbers

- **Compilation time**: 45s (C++) → 120s (Rust). Worse, but incremental builds are faster.
- **Runtime performance**: 8% faster on average due to better memory layout.
- **Bug density**: Zero memory safety bugs in 6 months of development.
- **Code size**: 15,000 lines (C++) → 9,200 lines (Rust). The type system eliminated entire categories of defensive checks.

## Would I Do It Again?

Absolutely. The upfront cost was roughly 3 months of dedicated work, but the ongoing maintenance burden dropped dramatically. I spend time building features now instead of chasing undefined behavior.

The Rust ecosystem for graphics is still young, but it's maturing fast. If you're starting a new graphics project today, there's no reason not to start in Rust.
