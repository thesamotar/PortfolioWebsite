---
title: "Spectra Engine"
tags: ["C++", "Vulkan", "Graphics", "Featured"]
thumbnail: "/images/spectra.jpg"
summary: "A real-time spectral rendering engine built from scratch in Rust, targeting browser-native WebGPU for interactive light-transport simulations."
video: null
---
## The Problem
Traditional RGB renderers fundamentally cannot reproduce physically accurate color phenomena like dispersion, fluorescence, and metamerism. Existing spectral renderers are offline-only and unusable for interactive applications.

## The Solution
Built a from-scratch spectral path tracer in Rust, compiled to WebAssembly for browser-native execution via WebGPU. Implemented Monte Carlo wavelength sampling with a custom BVH acceleration structure, a node-based material editor with real-time preview, and a spectral-to-RGB conversion pipeline calibrated against CIE standard observers.

## The Impact
Achieved 60fps on complex scenes in-browser. Open-sourced with 400+ GitHub stars. Adopted as a teaching tool by two university graphics courses.
