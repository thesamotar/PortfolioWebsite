# Technical Portfolio 

A blazing fast, retro-technical portfolio built with React and Vite. It features a responsive "Bento Box" grid system, an integrated headless Markdown CMS, and a dual reading experience — inline reader on desktop and modal popups on mobile.

## Quick Start

1. Install dependencies: `npm install`
2. Start the local dev server: `npm run dev`
3. Build for production: `npm run build`

---

## 📝 How to Write Content (The Markdown CMS)

Your website is powered entirely by Markdown files (`.md`). You do not need to write any Javascript to create new posts. 

All content lives in the `src/content/` directory. When you add a new file here, Vite will automatically discover it, parse it, and deploy it to your site.

### 1. Adding a Blog Post
Create a new `.md` file inside `src/content/blogs/`. 

**Required Format:**
```markdown
---
title: "Your Catchy Title"
date: "2026-06-06"
tags: ["Learning", "Featured"] 
thumbnail: "/images/your-image.jpg"
snippet: "A brief 1-2 sentence summary that shows up on the card and in the inline reader header."
---
Write your actual blog post here. You can use standard Markdown like **bold**, lists, and `code blocks`.
```
*Note:*
- *Include `"Featured"` to place this post on the homepage Featured grid.*
- *Include `"Learning"`, `"Reading"`, or `"Exploring"` to dynamically link this post to the corresponding tab in the "Working On" section of the homepage!*

### 2. Adding a Project
Create a new `.md` file inside `src/content/projects/`.

**Required Format:**
```markdown
---
title: "Project Name"
tags: ["TypeScript", "React", "Featured", "Working On"]
thumbnail: "/images/project-thumb.jpg"
summary: "Short summary of what this project does."
video: "https://example.com/demo.mp4" 
---
## The Problem
Describe the problem.

## The Solution
Describe the solution.

## The Impact
Describe the impact.
```
*Note: `video` can be `null` if you don't have a demo video. Adding the `"Working On"` tag will put this project in the "Working On" section on the homepage.*

### 3. Adding an Idea
Create a new `.md` file inside `src/content/ideas/`.

**Required Format:**
```markdown
---
title: "Crazy Startup Idea"
badge: "Developer Tools"
tags: ["Featured"]
thumbnail: "https://placehold.co/800x600/1A1A18/C4604A?text=Placeholder"
---
A detailed paragraph describing your product idea. This text will appear as the subtitle in the inline reader header on desktop.
```

---

## 🖥️ Reading Experience (Desktop vs Mobile)

The site has two different reading experiences depending on screen size:

### Desktop (≥ 901px) — Inline Reader
When you click on any blog, project, or idea card on a laptop/desktop:
- The **page heading** (e.g. "Blogs") is replaced with the **post title**, with tags beside it and an `×` close button on the right.
- The **post summary/snippet** and **date** appear below the title, in the same position as the original page subtitle.
- The **bento grid** is replaced with the **full post content** rendered as Markdown.
- Clicking the `×` button reverts everything back to the original grid view instantly.
- The navigation bar stays visible at all times.

### Mobile (< 901px) — Modal Popup
On phones/tablets, clicking a card opens a **standard modal popup overlay** that slides up over the current page. This keeps the mobile experience snappy and touch-friendly.

### Featured Section Carousel (Mobile)
On mobile, the homepage featured posts display as a **horizontal swipeable carousel** with indicator dots at the bottom. Swiping changes the active dot.

---

## ⚙️ How to Edit the Site Structure

If you want to edit the structural data of the website (like your Name, Email, or the Social Links in the Connect section), you should edit the `src/data/profileContent.js` file.

Inside that file, you will find simple Javascript objects that control the non-markdown parts of the site:

```javascript
  /* ─── Identity ─── */
  identity: {
    name: "Abhishek",
    title: "Software Engineer & Builder",
    tagline: "Crafting systems, shipping products, writing about both.",
    email: "abhishek@example.com",
    // ...
```

Simply change the text inside the quotes, save the file, and the website will update instantly!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Bento/              # Grid section components (BlogSection, ProjectsSection, IdeasSection, etc.)
│   ├── Modal/              # Modal components for mobile reading (BlogModal, ProjectModal)
│   └── InlineReader.jsx    # Desktop inline reader that replaces the grid with content
├── content/                # Markdown CMS — all your posts live here
│   ├── blogs/              # Blog post .md files
│   ├── projects/           # Project .md files
│   └── ideas/              # Idea .md files
├── data/
│   └── profileContent.js   # Identity, social links, and content aggregation
├── hooks/
│   └── useIsDesktop.js     # Hook to detect desktop (≥901px) vs mobile
├── pages/                  # Page components (HomePage, BlogsPage, ProjectsPage, IdeasPage)
└── styles/
    ├── global.css           # All component styles
    └── variables.css        # Design tokens (colors, fonts, spacing)
```
