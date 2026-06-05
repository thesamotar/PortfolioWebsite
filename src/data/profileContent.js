/* ==========================================================================
   PROFILE CONTENT — Central Data Repository
   ---------------------------------------------------------------------------
   All site content lives here. Pages read from this file.
   To update copy, edit strings below. Zero code changes elsewhere.
   ========================================================================== */

const profileContent = {

  /* ─── Identity ─── */
  identity: {
    name: "Abhishek",
    title: "Software Engineer & Builder",
    tagline: "Crafting systems, shipping products, writing about both.",
    email: "abhishek@example.com",
    resumeUrl: "/resume.pdf",
  },

  /* ─── Navigation (each is a route) ─── */
  navLinks: [
    { label: "Blogs",    path: "/blogs" },
    { label: "Projects", path: "/projects" },
    { label: "Ideas",    path: "/ideas" },
    { label: "Connect",  path: "/connect" },
  ],

  /* ─── Palette tokens ─── */
  palette: {
    mustard:  "#C4A14A",
    coral:    "#C4604A",
    teal:     "#3A7D7B",
    moss:     "#6B7F4A",
    olive:    "#8A8B5E",
  },

  /* ─── Projects ─── */
  projects: [
    {
      title: "Spectra Engine",
      tags: ["Rust", "WebGPU", "Rendering"],
      thumbnail: null,
      summary: "A real-time spectral rendering engine built from scratch in Rust, targeting browser-native WebGPU for interactive light-transport simulations.",
      caseStudy: {
        problem: "Traditional RGB renderers fundamentally cannot reproduce physically accurate color phenomena like dispersion, fluorescence, and metamerism. Existing spectral renderers are offline-only and unusable for interactive applications.",
        solution: "Built a from-scratch spectral path tracer in Rust, compiled to WebAssembly for browser-native execution via WebGPU. Implemented Monte Carlo wavelength sampling with a custom BVH acceleration structure, a node-based material editor with real-time preview, and a spectral-to-RGB conversion pipeline calibrated against CIE standard observers.",
        impact: "Achieved 60fps on complex scenes in-browser. Open-sourced with 400+ GitHub stars. Adopted as a teaching tool by two university graphics courses.",
      },
      video: null,
    },
    {
      title: "Draftboard",
      tags: ["React", "Node.js", "WebSocket", "CRDT"],
      thumbnail: null,
      summary: "Collaborative infinite canvas for real-time design and brainstorming, supporting 50+ concurrent users with sub-100ms latency.",
      caseStudy: {
        problem: "Existing collaboration tools break under heavy concurrent use, suffer from state conflicts, and impose rigid canvas boundaries that limit creative brainstorming workflows.",
        solution: "Designed a custom CRDT implementation for conflict-free state synchronization over WebSocket. Built an infinite canvas with spatial indexing via R-tree for smooth pan/zoom at any scale, and a plugin architecture allowing custom widgets and integrations.",
        impact: "Handles 50+ concurrent users with p99 latency under 80ms. Adopted by three design teams internally, reducing meeting time by an estimated 35%.",
      },
      video: "https://example.com/draftboard-demo.mp4",
    },
    {
      title: "TinyLM",
      tags: ["Python", "PyTorch", "NLP"],
      thumbnail: null,
      summary: "A minimal, from-scratch language model trainer — every layer is hand-written and documented for educational transparency.",
      caseStudy: {
        problem: "Modern ML frameworks abstract away transformer internals so heavily that students and practitioners lose intuition for how attention, positional encoding, and tokenization actually work at the mathematical level.",
        solution: "Implemented a full transformer in ~2000 lines of annotated Python with zero framework magic. Built a custom BPE tokenizer, mixed-precision training with gradient checkpointing, and interactive Jupyter notebooks walking through each component with visualizations.",
        impact: "Used as teaching material in 3 university courses. 800+ GitHub stars. Cited in two educational papers on ML pedagogy.",
      },
      video: null,
    },
    {
      title: "Pulse CLI",
      tags: ["Go", "gRPC", "Terminal UI"],
      thumbnail: null,
      summary: "A blazing-fast terminal dashboard for monitoring distributed systems health, latency, and throughput in real-time.",
      caseStudy: {
        problem: "DevOps teams juggle multiple monitoring dashboards across browser tabs, losing context switching between Grafana, Datadog, and custom tools. Terminal-native options lack real-time streaming and customizable views.",
        solution: "Built a keyboard-navigable TUI in Go with real-time gRPC streaming, automatic reconnection, sparkline charts, heatmaps, and log tailing. Designed a custom query language for filtering and alerting, plus a plugin system for arbitrary data sources.",
        impact: "Sub-10ms render loop. Deployed across 12 production services. Reduced mean-time-to-detection for incidents by 40% in internal benchmarks.",
      },
      video: null,
    },
  ],

  /* ─── Current focus (home page: "Working On" section) ─── */
  workingOn: {
    title: "Local-First Sync Engine",
    tags: ["Rust", "CRDT", "WASM", "SQLite"],
    description: "Building an offline-capable synchronization engine using CRDTs and SQLite compiled to WASM. The goal is a universal sync primitive that works across web, desktop, and mobile — enabling apps that feel instant regardless of connectivity.",
    vectors: [
      { label: "Learning",  value: "Distributed Systems & Consensus Algorithms" },
      { label: "Reading",   value: "Designing Data-Intensive Applications — Kleppmann" },
      { label: "Exploring", value: "WebAssembly Component Model & WASI Preview 2" },
    ],
  },

  /* ─── Blog posts ─── */
  posts: [
    {
      title: "Why I Rewrote My Renderer in Rust",
      date: "2026-05-18",
      snippet: "After three years of C++ pain, I migrated Spectra Engine to Rust. Here's what broke, what didn't, and why I'd do it again.",
      body: "## The Breaking Point\n\nIt started with a segfault at 2am on a Tuesday. The third one that week. My C++ spectral renderer had grown to 15,000 lines, and the ownership semantics were a minefield. Every refactor introduced a new memory bug.\n\nI'd been watching the Rust ecosystem mature for two years, and the WebGPU bindings (wgpu) had finally reached a level of stability that made the migration feasible.\n\n## The Migration Strategy\n\nI didn't do a big-bang rewrite. Instead, I built Rust bindings around the core math library first, validated numerical equivalence with property-based tests, then progressively replaced C++ modules one at a time.\n\nThe key insight was treating the BVH acceleration structure as the migration boundary. Everything above it (scene description, materials) could be ported independently from everything below it (ray traversal, intersection).\n\n## What Broke\n\n**The lifetime system nearly killed me.** My C++ renderer passed raw pointers freely between the scene graph, material system, and geometry buffers. Rust's borrow checker forced me to completely rethink ownership.\n\nThe solution was an arena allocator pattern — all geometry lives in a single arena, and nodes hold indices rather than references. This actually improved cache locality and boosted traversal performance by 15%.\n\n**The build system was painful.** Mixing Rust, WASM, and the WebGPU shader pipeline required a custom build orchestrator. I ended up writing a small Rust build script that pre-compiles WGSL shaders and bundles them as static assets.\n\n## What Didn't Break\n\nThe math. Rust's type system caught three subtle floating-point precision bugs during the port that had been silently producing incorrect renders in the C++ version for months.\n\n## The Numbers\n\n- **Compilation time**: 45s (C++) → 120s (Rust). Worse, but incremental builds are faster.\n- **Runtime performance**: 8% faster on average due to better memory layout.\n- **Bug density**: Zero memory safety bugs in 6 months of development.\n- **Code size**: 15,000 lines (C++) → 9,200 lines (Rust). The type system eliminated entire categories of defensive checks.\n\n## Would I Do It Again?\n\nAbsolutely. The upfront cost was roughly 3 months of dedicated work, but the ongoing maintenance burden dropped dramatically. I spend time building features now instead of chasing undefined behavior.\n\nThe Rust ecosystem for graphics is still young, but it's maturing fast. If you're starting a new graphics project today, there's no reason not to start in Rust.",
    },
    {
      title: "CRDTs for Mere Mortals",
      date: "2026-04-02",
      snippet: "A visual, jargon-free introduction to Conflict-Free Replicated Data Types with interactive diagrams.",
      body: "## What Problem Do CRDTs Solve?\n\nImagine two people editing the same document simultaneously on different continents. Traditional databases handle this with locks — one person waits while the other types. CRDTs eliminate the wait entirely.\n\nA Conflict-Free Replicated Data Type is a data structure that can be modified independently on different machines and always merged back together without conflicts. No coordination needed. No locks. No central server deciding who wins.\n\n## The Intuition\n\nThink of a whiteboard in a meeting room. Multiple people can write on it simultaneously. There's no 'conflict' because the whiteboard just accumulates marks. A CRDT works on the same principle — it's designed so that all operations commute.\n\n## The Three Flavors\n\n**G-Counter (Grow-only Counter):** Each node maintains its own counter. The merged value is the sum of all nodes. Simple, but you can only count up.\n\n**LWW-Register (Last-Writer-Wins):** Each update carries a timestamp. Merge picks the latest timestamp. Simple but lossy — concurrent writes are silently dropped.\n\n**OR-Set (Observed-Remove Set):** Elements are tagged with unique IDs. Adding creates a new tag; removing deletes specific tags. This means add and remove can happen concurrently without conflict.\n\n## Building Draftboard's CRDT\n\nFor Draftboard, I needed a CRDT that could handle:\n1. Concurrent object creation and deletion\n2. Simultaneous property updates (position, color, text)\n3. Nested structures (groups containing objects)\n\nI built a hybrid: an OR-Map (each key is an OR-Set entry) where values are LWW-Registers for simple properties and RGA (Replicated Growable Array) for ordered sequences like text.\n\nThe total implementation is ~800 lines of TypeScript with full test coverage. The key was keeping the CRDT layer completely separate from the rendering layer — the canvas just subscribes to state changes and re-renders.\n\n## Performance Considerations\n\nCRDTs accumulate metadata (tombstones for deleted items, vector clocks for ordering). Left unchecked, this metadata grows unboundedly.\n\nI implemented a garbage collection protocol where nodes periodically agree on a 'stable checkpoint' — a point in time where all operations have been seen by all nodes. Metadata before this checkpoint can be safely discarded.\n\nThis keeps memory usage constant regardless of document history length.",
    },
    {
      title: "The Case for Local-First Software",
      date: "2026-02-14",
      snippet: "Why I'm betting my next project on local-first architecture — and why you should care even if you're building for the cloud.",
      body: "## The Cloud Dependency Problem\n\nEvery SaaS application you use is a rental agreement. Your data lives on someone else's servers, accessed through someone else's API, rendered by someone else's client. When the company pivots, gets acquired, or shuts down, your data goes with it.\n\nLocal-first software inverts this model. Your data lives on your device first. The cloud is an optional synchronization and backup layer, not the source of truth.\n\n## What Local-First Means in Practice\n\n1. **No spinners.** The app works instantly because it reads from local storage.\n2. **Offline by default.** Full functionality without an internet connection.\n3. **Data ownership.** Your files are yours. Export is trivial.\n4. **Collaboration without compromise.** CRDTs enable real-time sync when online.\n5. **Privacy by architecture.** Data can be end-to-end encrypted because the server never needs to read it.\n\n## The Technical Stack\n\nMy current local-first stack:\n- **Storage**: SQLite via wa-sqlite (WASM-compiled SQLite in the browser)\n- **Sync**: Custom CRDT layer over WebSocket\n- **Encryption**: libsodium for E2E encryption of sync payloads\n- **Offline**: Service worker for full offline capability\n\n## The Tradeoffs\n\nLocal-first isn't free. You're trading server simplicity for client complexity:\n- **Storage limits**: Browsers cap IndexedDB at ~50% of available disk\n- **Migration complexity**: Schema changes must be handled client-side\n- **Initial sync**: Large datasets take time to replicate\n- **Conflict resolution**: CRDTs handle most cases, but some require UI\n\n## Why I'm Betting on It\n\nThe web platform has matured enough to make local-first viable. WASM gives us native-speed computation. OPFS gives us fast file system access. CRDTs give us conflict-free collaboration.\n\nThe missing piece was always performance. Now that it's solved, the user experience advantages of local-first are overwhelming. I'm building my next three projects on this architecture.",
    },
  ],

  /* ─── Product Ideas ─── */
  ideas: [
    {
      title: "Ambient Codebase Radio",
      badge: "Developer Tools",
      description: "An ambient soundscape generator that maps codebase activity — commits, CI runs, deployments — to generative audio. Let teams hear their system's pulse.",
    },
    {
      title: "Offline-First Field Notes",
      badge: "Productivity",
      description: "A local-first, encrypted note-taking app for researchers in low-connectivity environments with seamless sync when back online.",
    },
    {
      title: "Contract Diff Viewer",
      badge: "Legal Tech",
      description: "A visual diff tool for legal contracts that highlights semantic changes, not just text diffs — powered by clause-level NLP embeddings.",
    },
  ],

  /* ─── Connect ─── */
  connect: {
    nodes: [
      { label: "GitHub",    url: "https://github.com",           icon: "GH" },
      { label: "LinkedIn",  url: "https://linkedin.com",         icon: "IN" },
      { label: "Twitter/X", url: "https://x.com",                icon: "X" },
      { label: "Email",     url: "mailto:abhishek@example.com",  icon: "✉" },
    ],
    actions: [
      { label: "Download Resume PDF", action: "download-resume", icon: "↓" },
      { label: "Copy Email Address",  action: "copy-email",      icon: "✉" },
    ],
    status: {
      label: "Open to Opportunities",
      pulse: true,
    },
  },
};

export default profileContent;
