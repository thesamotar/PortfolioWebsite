---
title: "Pulse CLI"
tags: ["Go", "gRPC", "Terminal UI", "Featured"]
thumbnail: "https://placehold.co/800x600/1A1A18/C4A14A?text=Placeholder"
summary: "A blazing-fast terminal dashboard for monitoring distributed systems health, latency, and throughput in real-time."
video: null
---
## The Problem
DevOps teams juggle multiple monitoring dashboards across browser tabs, losing context switching between Grafana, Datadog, and custom tools. Terminal-native options lack real-time streaming and customizable views.

## The Solution
Built a keyboard-navigable TUI in Go with real-time gRPC streaming, automatic reconnection, sparkline charts, heatmaps, and log tailing. Designed a custom query language for filtering and alerting, plus a plugin system for arbitrary data sources.

## The Impact
Sub-10ms render loop. Deployed across 12 production services. Reduced mean-time-to-detection for incidents by 40% in internal benchmarks.
