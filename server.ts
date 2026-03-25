import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Initialize Firebase Admin
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
} catch (error) {
  console.warn("Firebase Admin initialization failed. Some server-side features may be limited.", error);
}
const db = admin.apps.length ? admin.firestore() : null;

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

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const appUrl = process.env.APP_URL || `https://ai-free-hub-phi.vercel.app`;
    const robots = `User-agent: *
Allow: /
Sitemap: ${appUrl}/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  // Sitemap.xml
  app.get("/sitemap.xml", async (req, res) => {
    const appUrl = process.env.APP_URL || `https://ai-free-hub-phi.vercel.app`;
    
    try {
      if (!db) throw new Error("Firestore Admin not initialized");
      
      // Try to fetch dynamic content from Firestore
      const [toolsSnap, blogsSnap] = await Promise.all([
        db.collection('tools').where('published', '==', true).get(),
        db.collection('blogs').where('published', '==', true).get()
      ]);

      const tools = toolsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const blogs = blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Static pages
      const staticPages = [
        '',
        '/tools',
        '/prompts',
        '/tutorials',
        '/blog'
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${appUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${tools.map(tool => `
  <url>
    <loc>${appUrl}/tool/${tool.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${blogs.map(post => `
  <url>
    <loc>${appUrl}/blog/${post.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

      res.header("Content-Type", "application/xml");
      res.header("X-Robots-Tag", "index, follow");
      res.send(sitemap);
    } catch (error) {
      console.warn("Dynamic sitemap generation failed, falling back to static file:", error);
      // Fallback to static file if it exists
      const staticSitemapPath = path.join(__dirname, "public", "sitemap.xml");
      const distSitemapPath = path.join(__dirname, "dist", "sitemap.xml");
      
      res.header("Content-Type", "application/xml");
      res.header("X-Robots-Tag", "index, follow");

      if (fs.existsSync(distSitemapPath)) {
        res.sendFile(distSitemapPath);
      } else if (fs.existsSync(staticSitemapPath)) {
        res.sendFile(staticSitemapPath);
      } else {
        res.status(500).send("Error generating sitemap");
      }
    }
  });

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
    
    // Fallback to index.html for SPA routing in development if vite middleware doesn't catch it
    app.get("*", async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        const template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
