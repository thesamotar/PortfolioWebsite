---
title: "TinyLM"
tags: ["C", "CUDA", "Machine Learning", "Featured"]
thumbnail: "/images/tinylm.jpg"
summary: "A minimal, from-scratch language model trainer — every layer is hand-written and documented for educational transparency."
video: null
---
## The Problem
Modern ML frameworks abstract away transformer internals so heavily that students and practitioners lose intuition for how attention, positional encoding, and tokenization actually work at the mathematical level.

## The Solution
Implemented a full transformer in ~2000 lines of annotated Python with zero framework magic. Built a custom BPE tokenizer, mixed-precision training with gradient checkpointing, and interactive Jupyter notebooks walking through each component with visualizations.

## The Impact
Used as teaching material in 3 university courses. 800+ GitHub stars. Cited in two educational papers on ML pedagogy.
