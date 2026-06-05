# Portfolio Website

Welcome to the Portfolio Website repository! This project is a modern, highly interactive, and retro-themed developer portfolio built with React and Vite.

This document serves as a guide for developers (and AI agents) who need to understand the architecture, design system, and content management of the site.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (`src/styles/global.css`)
- **Routing**: React Router (`src/App.jsx` handles custom multi-page routing)
- **Deployment**: Standard static site generation

## Design System & Aesthetics
The site employs a distinct "retro editorial" aesthetic:
- **Colors**: Uses a warm paper background (`var(--canvas-paper)`: `#F5F2EB`) combined with stark, bold typography (`var(--ink)`: `#1A1A1A`). There are also accent colors like mustard, coral, and teal for tags.
- **Typography**: Large, bold Serif fonts for headings (`var(--font-serif)`) paired with clean Sans-serif for body text, and Monospace for tags and metadata.
- **Grid Layout**: Features a customized asymmetrical 3-column grid (`.grid-layout--3-col`). The very first card in any grid layout automatically spans 2 full rows and 1 column, creating a dominant editorial showcase, while subsequent cards neatly flow into the remaining columns.
- **Interactive Cards**: Instead of flat cards, all project, blog, and idea cards have images that act as the background. By default, only the bold title text is visible at the bottom. When hovered, an opaque "paper" background smoothly slides upwards (using a robust CSS `max-height` transition) to reveal the hidden tags, descriptive summaries, and action links layered directly over the image.

## Content Management (`src/data/profileContent.js`)
All content on the site is purely data-driven and decoupled from the UI components. To update the website's content, you only need to edit `src/data/profileContent.js`. No React component changes are required.

### 1. Selected / Featured Projects (Home Page)
The Home Page pulls its featured projects dynamically based on tags. 
- To feature a project on the Home Page, add the string `"Featured"` to its `tags` array inside the `projects` list.

### 2. Blogs / Posts
- Posts are rendered on the `/blogs` route.
- The `BlogsPage` component automatically sorts all posts chronologically in descending order (newest first) based on the `date` string in the object.

### 3. Adding Media
- Thumbnails and images should be defined in the content objects (e.g., `thumbnail: "/path/to/image.png"`).
- Currently, if an image is `null`, the UI falls back to a solid warm-grey placeholder block (`var(--canvas-warm)`).

## Component Architecture
- **Pages**: `HomePage`, `ProjectsPage`, `BlogsPage`, `IdeasPage`, `ConnectPage`
- **Bento Sections**: The UI is composed of "Bento-style" grid sections (`GridSection`). This component handles the core structural layout and top borders, while its children (e.g., `ProjectsSection`, `BlogSection`, `IdeasSection`) map the data to the individual interactive cards.
- **Modals**: Detailed case studies and full blog posts are rendered via floating overlays (e.g., `ProjectModal.jsx`, `BlogModal.jsx`).

## Development Scripts
- `npm install` - Install dependencies
- `npm run dev` - Start the local development server (typically at `http://localhost:5173`)
- `npm run build` - Build the production bundle

## AI Agent Instructions
If you are an AI agent generating content or modifying this site:
1. **Always edit `src/data/profileContent.js`** when adding new projects, blogs, or ideas.
2. **Preserve the CSS Grid architecture** in `global.css`. If adding new sections, use the `<GridSection columns={3}>` component to ensure the layout remains consistent with the asymmetrical design.
3. **Do not use Tailwind or inline styles**. All styling must reside in `src/styles/global.css` using the predefined CSS variables (tokens).
