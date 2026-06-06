---
title: "The Case for Local-First Software"
date: "2026-02-14"
tags: ["Reading"]
thumbnail: "https://placehold.co/800x600/1A1A18/6B7F4A?text=Placeholder"
snippet: "Why I'm betting my next project on local-first architecture — and why you should care even if you're building for the cloud."
---
## The Cloud Dependency Problem

Every SaaS application you use is a rental agreement. Your data lives on someone else's servers, accessed through someone else's API, rendered by someone else's client. When the company pivots, gets acquired, or shuts down, your data goes with it.

Local-first software inverts this model. Your data lives on your device first. The cloud is an optional synchronization and backup layer, not the source of truth.

## What Local-First Means in Practice

1. **No spinners.** The app works instantly because it reads from local storage.
2. **Offline by default.** Full functionality without an internet connection.
3. **Data ownership.** Your files are yours. Export is trivial.
4. **Collaboration without compromise.** CRDTs enable real-time sync when online.
5. **Privacy by architecture.** Data can be end-to-end encrypted because the server never needs to read it.

## The Technical Stack

My current local-first stack:
- **Storage**: SQLite via wa-sqlite (WASM-compiled SQLite in the browser)
- **Sync**: Custom CRDT layer over WebSocket
- **Encryption**: libsodium for E2E encryption of sync payloads
- **Offline**: Service worker for full offline capability

## The Tradeoffs

Local-first isn't free. You're trading server simplicity for client complexity:
- **Storage limits**: Browsers cap IndexedDB at ~50% of available disk
- **Migration complexity**: Schema changes must be handled client-side
- **Initial sync**: Large datasets take time to replicate
- **Conflict resolution**: CRDTs handle most cases, but some require UI

## Why I'm Betting on It

The web platform has matured enough to make local-first viable. WASM gives us native-speed computation. OPFS gives us fast file system access. CRDTs give us conflict-free collaboration.

The missing piece was always performance. Now that it's solved, the user experience advantages of local-first are overwhelming. I'm building my next three projects on this architecture.
