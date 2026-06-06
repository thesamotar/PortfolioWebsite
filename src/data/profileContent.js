/* ==========================================================================
   PROFILE CONTENT — Central Data Repository
   ---------------------------------------------------------------------------
   Content is now powered by individual Markdown files in src/content/
   ========================================================================== */

// Use Vite's glob import to read all .md files as raw strings at build-time
const projectFiles = import.meta.glob('../content/projects/*.md', { eager: true, query: '?raw', import: 'default' });
const blogFiles = import.meta.glob('../content/blogs/*.md', { eager: true, query: '?raw', import: 'default' });
const ideaFiles = import.meta.glob('../content/ideas/*.md', { eager: true, query: '?raw', import: 'default' });

// Lightweight, browser-safe frontmatter parser
function parseFiles(filesObj) {
  return Object.values(filesObj).map((fileContent) => {
    // Match frontmatter block
    const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { body: fileContent };

    const [, frontmatterStr, body] = match;
    const data = {};

    frontmatterStr.split('\n').forEach(line => {
      const sepIdx = line.indexOf(':');
      if (sepIdx === -1) return;
      const key = line.slice(0, sepIdx).trim();
      let value = line.slice(sepIdx + 1).trim();

      // Parse JSON-like arrays: ["Item 1", "Item 2"]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, ''));
        if (value.length === 1 && value[0] === '') value = [];
      } 
      else if (value === 'null') value = null;
      else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else {
        // Remove surrounding quotes for strings
        value = value.replace(/^"|"$/g, '');
      }

      data[key] = value;
    });

    return {
      ...data,
      body: body.trim(),
    };
  });
}

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
  ],

  /* ─── Palette tokens ─── */
  palette: {
    mustard:  "#C4A14A",
    coral:    "#C4604A",
    teal:     "#3A7D7B",
    moss:     "#6B7F4A",
    olive:    "#8A8B5E",
  },

  /* ─── Dynamic Content from Markdown ─── */
  projects: parseFiles(projectFiles),
  posts: parseFiles(blogFiles),
  ideas: parseFiles(ideaFiles),

  /* ─── Connect ─── */
  connect: {
    nodes: [
      { label: "GitHub",    url: "https://github.com",           icon: "GH" },
      { label: "LinkedIn",  url: "https://linkedin.com",         icon: "IN" },
      { label: "Twitter/X", url: "https://x.com",                icon: "X" },
      { label: "Email",     url: "mailto:abhishek@example.com",  icon: "✉" },
    ],
    actions: [
      { label: "Copy Email Address",  action: "copy-email",      icon: "✉" },
    ],
    status: {
      label: "Open to Opportunities",
      pulse: true,
    },
  },
};

export default profileContent;
