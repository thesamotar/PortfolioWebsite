---
title: "Building a Better Build System"
date: "2025-11-05"
tags: ["Featured"]
snippet: "Makefiles are great until they aren't. Here's why we moved to a custom Rust-based build orchestrator."
---
## The Mess
Our C++ and Rust mono-repo was taking 15 minutes to build on CI. We had CMake calling Makefiles calling Python scripts that ultimately invoked rustc.

The solution was writing a highly specialized build tool that perfectly understood our dependency graph, resulting in an 80% reduction in build times.
