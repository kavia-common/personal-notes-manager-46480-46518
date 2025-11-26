#!/usr/bin/env node
/**
 * PUBLIC_INTERFACE
 * Simple static file server for the Next.js exported site in ./out.
 * - Serves files from the 'out' directory (next export output).
 * - Respects PORT or NEXT_PUBLIC_PORT env to select port (default 3000).
 * - Gracefully handles EADDRINUSE by suggesting an alternative port.
 *
 * Usage:
 *   PORT=3001 node server-static.js
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PUBLIC_DIR = path.resolve(__dirname, "out");
const DEFAULT_PORT =
  Number(process.env.NEXT_PUBLIC_PORT || process.env.PORT || 3000);

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".ico":
      return "image/x-icon";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function serveFile(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not found");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType(filePath));
    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      res.statusCode = 500;
      res.end("Internal server error");
    });
    stream.pipe(res);
  });
}

function createServer() {
  return http.createServer((req, res) => {
    const parsed = url.parse(req.url || "/");
    let pathname = decodeURIComponent(parsed.pathname || "/");

    // Health check support
    if (pathname === "/health" || pathname === "/healthz" || pathname === "/status") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }

    // Map URL to file in out/
    let filePath = path.join(PUBLIC_DIR, pathname);

    // If path is a directory, attempt index.html
    if (filePath.endsWith("/")) {
      filePath = path.join(filePath, "index.html");
    } else {
      // If no extension, try as directory with index.html then .html
      if (!path.extname(filePath)) {
        const asDir = path.join(filePath, "index.html");
        const asHtml = filePath + ".html";
        if (fs.existsSync(asDir)) {
          filePath = asDir;
        } else if (fs.existsSync(asHtml)) {
          filePath = asHtml;
        }
      }
    }

    // Security: prevent path escaping
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(PUBLIC_DIR)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    serveFile(resolved, res);
  });
}

function start(port) {
  const server = createServer();
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[static] Serving ./out at http://localhost:${port}`);
  });
  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      const alt = port + 1;
      // eslint-disable-next-line no-console
      console.error(
        `Port ${port} is in use. Try setting PORT=${alt} (e.g., PORT=${alt} node server-static.js)`
      );
      process.exit(1);
    } else {
      // eslint-disable-next-line no-console
      console.error("Server error:", err);
      process.exit(1);
    }
  });
}

if (!fs.existsSync(PUBLIC_DIR)) {
  // eslint-disable-next-line no-console
  console.error(
    "Output directory './out' was not found. Run 'npm run build' to export the site."
  );
  process.exit(1);
}

start(DEFAULT_PORT);
