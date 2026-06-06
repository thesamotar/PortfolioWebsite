# Technical Portfolio 

A blazing fast, retro-technical portfolio built with React and Vite. It features a responsive "Bento Box" grid system and an integrated headless Markdown CMS.

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
snippet: "A brief 1-2 sentence summary that shows up on the card."
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
A detailed paragraph describing your product idea.
```

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
