import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./src/lib/db";
import { TOOLS, PROMPTS, BLOG_POSTS } from "./src/data/mockData";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Seed Database if empty
  const toolCount = db.prepare("SELECT COUNT(*) as count FROM tools").get() as any;
  if (toolCount.count === 0) {
    console.log("Seeding database...");

    const insertTool = db.prepare("INSERT INTO tools (id, name, description, category, isFree, image, link) VALUES (?, ?, ?, ?, ?, ?, ?)");
    TOOLS.forEach(tool => {
      insertTool.run(tool.id, tool.name, tool.description, tool.category, tool.isFree ? 1 : 0, tool.image, tool.link);
    });

    const insertPrompt = db.prepare("INSERT INTO prompts (id, text, category, badge, outputImage) VALUES (?, ?, ?, ?, ?)");
    PROMPTS.forEach(prompt => {
      insertPrompt.run(prompt.id, prompt.text, prompt.category, prompt.badge, prompt.outputImage || null);
    });

    const insertBlog = db.prepare("INSERT INTO blog_posts (id, title, description, thumbnail, date, trending) VALUES (?, ?, ?, ?, ?, ?)");
    BLOG_POSTS.forEach(post => {
      insertBlog.run(post.id, post.title, post.description, post.thumbnail, post.date, post.trending ? 1 : 0);
    });
    console.log("Database seeded.");
  }

  // Auth Middleware
  const authenticateAdmin = (req: any, res: any, next: any) => {
    // TODO: Replace with Firebase Admin SDK verification
    // Example:
    // const token = req.headers.authorization?.split(' ')[1];
    // try {
    //   const decodedToken = await admin.auth().verifyIdToken(token);
    //   req.user = { email: decodedToken.email, role: 'ADMIN' }; // Role logic here
    // } catch (e) {
    //   return res.status(401).json({ error: "Invalid token" });
    // }

    // For now, we assume req.user is populated by the future Firebase middleware.
    // To keep the system functional during transition, you might want to 
    // temporarily mock req.user if you are testing without Firebase.
    
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(401).json({ error: "Unauthorized: Admin access required" });
    }
    next();
  };

  // Public API Routes
  app.get("/api/tools", (req, res) => {
    const tools = db.prepare("SELECT * FROM tools WHERE published = 1").all();
    res.json(tools);
  });

  app.get("/api/prompts", (req, res) => {
    const prompts = db.prepare("SELECT * FROM prompts WHERE published = 1").all();
    res.json(prompts);
  });

  app.get("/api/blog", (req, res) => {
    const posts = db.prepare("SELECT * FROM blog_posts WHERE published = 1").all();
    res.json(posts);
  });

  // Admin API Routes (CRUD)
  app.get("/api/admin/stats", (req, res) => {
    const toolsCount = db.prepare("SELECT COUNT(*) as count FROM tools").get() as any;
    const promptsCount = db.prepare("SELECT COUNT(*) as count FROM prompts").get() as any;
    const blogCount = db.prepare("SELECT COUNT(*) as count FROM blog_posts").get() as any;
    res.json({ tools: toolsCount.count, prompts: promptsCount.count, blog: blogCount.count });
  });

  // Tools CRUD
  app.post("/api/admin/tools", (req, res) => {
    const { id, name, description, category, isFree, image, link } = req.body;
    db.prepare("INSERT INTO tools (id, name, description, category, isFree, image, link) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(id || `tool-${Date.now()}`, name, description, category, isFree ? 1 : 0, image, link);
    res.status(201).json({ success: true });
  });

  app.put("/api/admin/tools/:id", (req, res) => {
    const { name, description, category, isFree, image, link, published } = req.body;
    db.prepare("UPDATE tools SET name = ?, description = ?, category = ?, isFree = ?, image = ?, link = ?, published = ? WHERE id = ?")
      .run(name, description, category, isFree ? 1 : 0, image, link, published ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/admin/tools/:id", (req, res) => {
    db.prepare("DELETE FROM tools WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Prompts CRUD
  app.get("/api/admin/prompts", (req, res) => {
    const prompts = db.prepare("SELECT * FROM prompts").all();
    res.json(prompts);
  });

  app.post("/api/admin/prompts", (req, res) => {
    const { id, text, category, badge, outputImage } = req.body;
    db.prepare("INSERT INTO prompts (id, text, category, badge, outputImage) VALUES (?, ?, ?, ?, ?)")
      .run(id || `prompt-${Date.now()}`, text, category, badge, outputImage || null);
    res.status(201).json({ success: true });
  });

  app.put("/api/admin/prompts/:id", (req, res) => {
    const { text, category, badge, outputImage, published } = req.body;
    db.prepare("UPDATE prompts SET text = ?, category = ?, badge = ?, outputImage = ?, published = ? WHERE id = ?")
      .run(text, category, badge, outputImage || null, published ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/admin/prompts/:id", (req, res) => {
    db.prepare("DELETE FROM prompts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Blog CRUD
  app.get("/api/admin/blog", (req, res) => {
    const posts = db.prepare("SELECT * FROM blog_posts").all();
    res.json(posts);
  });

  app.post("/api/admin/blog", (req, res) => {
    const { id, title, description, thumbnail, date, content, trending } = req.body;
    db.prepare("INSERT INTO blog_posts (id, title, description, thumbnail, date, content, trending) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(id || `blog-${Date.now()}`, title, description, thumbnail, date, content || null, trending ? 1 : 0);
    res.status(201).json({ success: true });
  });

  app.put("/api/admin/blog/:id", (req, res) => {
    const { title, description, thumbnail, date, content, trending, published } = req.body;
    db.prepare("UPDATE blog_posts SET title = ?, description = ?, thumbnail = ?, date = ?, content = ?, trending = ?, published = ? WHERE id = ?")
      .run(title, description, thumbnail, date, content || null, trending ? 1 : 0, published ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/admin/blog/:id", (req, res) => {
    db.prepare("DELETE FROM blog_posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Settings CRUD
  app.get("/api/admin/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM site_settings").all();
    res.json(settings);
  });

  app.post("/api/admin/settings", (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)")
      .run(key, value);
    res.json({ success: true });
  });

  // Page SEO CRUD
  app.get("/api/admin/seo", (req, res) => {
    const seo = db.prepare("SELECT * FROM page_seo").all();
    res.json(seo);
  });

  app.post("/api/admin/seo", (req, res) => {
    const { page_path, title, description, keywords } = req.body;
    db.prepare("INSERT OR REPLACE INTO page_seo (page_path, title, description, keywords, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)")
      .run(page_path, title, description, keywords);
    res.json({ success: true });
  });

  // Seed Page SEO if empty
  const seoCount = db.prepare("SELECT COUNT(*) as count FROM page_seo").get() as any;
  if (seoCount.count === 0) {
    console.log("Seeding page SEO...");
    const defaultPages = [
      { path: '/', title: 'Neural - The Ultimate AI Directory', description: 'Discover the best free AI tools, prompts, and tutorials.', keywords: 'AI tools, free AI, prompts, tutorials' },
      { path: '/tools', title: 'AI Tools Directory | Neural', description: 'Explore our curated list of the best AI tools available for free.', keywords: 'AI tools, directory, free software' },
      { path: '/prompts', title: 'AI Prompts Library | Neural', description: 'Master AI with our library of curated prompts for ChatGPT, Midjourney, and more.', keywords: 'AI prompts, ChatGPT prompts, Midjourney prompts' },
      { path: '/tutorials', title: 'AI Tutorials & Guides | Neural', description: 'Learn how to use AI tools effectively with our step-by-step tutorials.', keywords: 'AI tutorials, learning AI, guides' },
      { path: '/blog', title: 'AI Insights Blog | Neural', description: 'Stay updated with the latest news and insights from the world of AI.', keywords: 'AI blog, AI news, tech insights' },
      { path: '/search', title: 'Search AI Tools | Neural', description: 'Search our database for the perfect AI tool for your needs.', keywords: 'search AI, find tools' },
      { path: '/about', title: 'About Neural', description: 'Learn more about our mission to make AI accessible to everyone.', keywords: 'about us, mission' },
      { path: '/privacy', title: 'Privacy Policy | Neural', description: 'How we handle your data and protect your privacy.', keywords: 'privacy policy, data protection' },
      { path: '/contact', title: 'Contact Us | Neural', description: 'Get in touch with the Neural team.', keywords: 'contact, support' },
    ];
    const insertSeo = db.prepare("INSERT INTO page_seo (page_path, title, description, keywords) VALUES (?, ?, ?, ?)");
    defaultPages.forEach(p => insertSeo.run(p.path, p.title, p.description, p.keywords));
    console.log("Page SEO seeded.");
  }

  // Media Upload Route
  app.post("/api/admin/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
