---
title: "CRDTs for Mere Mortals"
date: "2026-04-02"
tags: ["Learning"]
thumbnail: "https://placehold.co/800x600/1A1A18/C4A14A?text=Placeholder"
snippet: "A visual, jargon-free introduction to Conflict-Free Replicated Data Types with interactive diagrams."
---
## What Problem Do CRDTs Solve?

Imagine two people editing the same document simultaneously on different continents. Traditional databases handle this with locks — one person waits while the other types. CRDTs eliminate the wait entirely.

A Conflict-Free Replicated Data Type is a data structure that can be modified independently on different machines and always merged back together without conflicts. No coordination needed. No locks. No central server deciding who wins.

## The Intuition

Think of a whiteboard in a meeting room. Multiple people can write on it simultaneously. There's no 'conflict' because the whiteboard just accumulates marks. A CRDT works on the same principle — it's designed so that all operations commute.

## The Three Flavors

**G-Counter (Grow-only Counter):** Each node maintains its own counter. The merged value is the sum of all nodes. Simple, but you can only count up.

**LWW-Register (Last-Writer-Wins):** Each update carries a timestamp. Merge picks the latest timestamp. Simple but lossy — concurrent writes are silently dropped.

**OR-Set (Observed-Remove Set):** Elements are tagged with unique IDs. Adding creates a new tag; removing deletes specific tags. This means add and remove can happen concurrently without conflict.

## Building Draftboard's CRDT

For Draftboard, I needed a CRDT that could handle:
1. Concurrent object creation and deletion
2. Simultaneous property updates (position, color, text)
3. Nested structures (groups containing objects)

I built a hybrid: an OR-Map (each key is an OR-Set entry) where values are LWW-Registers for simple properties and RGA (Replicated Growable Array) for ordered sequences like text.

The total implementation is ~800 lines of TypeScript with full test coverage. The key was keeping the CRDT layer completely separate from the rendering layer — the canvas just subscribes to state changes and re-renders.

## Performance Considerations

CRDTs accumulate metadata (tombstones for deleted items, vector clocks for ordering). Left unchecked, this metadata grows unboundedly.

I implemented a garbage collection protocol where nodes periodically agree on a 'stable checkpoint' — a point in time where all operations have been seen by all nodes. Metadata before this checkpoint can be safely discarded.

This keeps memory usage constant regardless of document history length.
