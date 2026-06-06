---
title: "Draftboard"
tags: ["TypeScript", "Canvas API", "CRDTs", "Featured", "Working On"]
thumbnail: "/images/draftboard.jpg"
summary: "Collaborative infinite canvas for real-time design and brainstorming, supporting 50+ concurrent users with sub-100ms latency."
video: "https://example.com/draftboard-demo.mp4"
---
## The Problem
Existing collaboration tools break under heavy concurrent use, suffer from state conflicts, and impose rigid canvas boundaries that limit creative brainstorming workflows.

## The Solution
Designed a custom CRDT implementation for conflict-free state synchronization over WebSocket. Built an infinite canvas with spatial indexing via R-tree for smooth pan/zoom at any scale, and a plugin architecture allowing custom widgets and integrations.

## The Impact
Handles 50+ concurrent users with p99 latency under 80ms. Adopted by three design teams internally, reducing meeting time by an estimated 35%.
