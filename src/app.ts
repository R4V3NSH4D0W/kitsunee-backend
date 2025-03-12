import express from "express";
import axios from "axios";
import gogoRoute from './routes/gogo-route';
import zoroRoute from './routes/zoro-route';
import _9animeRoute from './routes/9anime-route';
import path from "path";
import logger from "./utils/logging";
import { Request, Response, NextFunction } from "express";

const app = express();

// Middlewares
app.get("/api/anime/proxy/:host/*", async (req: Request, res: Response): Promise<void> => {
  try {
    // Decode host and path segments
    const encodedHost = req.params.host;
    const encodedPathSegments = req.params[0]?.split("/") || [];
    
    const host = decodeURIComponent(encodedHost);
    const path = encodedPathSegments
      .map(segment => decodeURIComponent(segment))
      .join("/");

    // Construct target URL
    const targetUrl = new URL(`https://${host}/${path}`);

    // Validate URL
    if (!isValidUrl(targetUrl)) {
       res.status(403).json({ error: "Forbidden domain" });
       return;
    }

    // Proxy request
    const response = await axios.get(targetUrl.toString(), {
      responseType: "stream",
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": targetUrl.origin
      }
    });

    // Handle redirects
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.location;
      if (!location) throw new Error("Invalid redirect");
      return res.redirect(`/api/anime/proxy/${
        encodeURIComponent(new URL(location, targetUrl).host)
      }/${
        new URL(location, targetUrl).pathname
          .split("/")
          .map(segment => encodeURIComponent(segment))
          .join("/")
      }`);
    }

    // Stream response
    res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600");
    response.data.pipe(res);

    // Handle client disconnect
    req.on("close", () => response.data.destroy());

  } catch (error: unknown) {
    logger.error(`Proxy error: ${error instanceof Error ? error.message : "Unknown error"}`);
    if (res.headersSent) return;
    
    const status = axios.isAxiosError(error) ? error.response?.status || 500 : 500;
    const message = error instanceof Error ? error.message : "Proxy failed";
    res.status(status).json({ error: message });
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  logger.info(`Serving index.html for route: ${req.url}`);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/api/gogoanime', gogoRoute);
app.use('/api/zoroanime', zoroRoute);
app.use('/api/9anime', _9animeRoute);


// Enhanced Proxy Handler
app.get("/api/anime/proxy/*", async (req: Request, res: Response): Promise<void> => {
  try {
    const encodedPath = req.params[0];
    let decodedPath = decodeURIComponent(encodedPath);

    // Extract base URL from referer for HLS segment requests
    let baseUrl = "";
    const referer = req.headers.referer;
    if (referer) {
      const refererMatch = referer.match(/api\/anime\/proxy\/(https?%3A%2F%2F[^/]+)/i);
      if (refererMatch) {
        baseUrl = decodeURIComponent(refererMatch[1]);
      }
    }

    // Handle relative paths and reconstruct full URL
    if (!decodedPath.startsWith("http")) {
      if (!baseUrl) {
         res.status(400).json({ error: "Missing base URL context" });
         return;
      }
      // Resolve against original base URL with path
      const baseWithPath = new URL(baseUrl);
      decodedPath = new URL(decodedPath, baseWithPath.origin + baseWithPath.pathname).href;
    }

    // Sanitize and validate URL
    decodedPath = decodedPath
      .replace(/^(https?:\/\/)/, "")
      .replace(/\/{2,}/g, "/");

    const targetUrl = new URL(`https://${decodedPath}`);

    // Enhanced security validation
    if (!isValidUrl(targetUrl)) {
       res.status(403).json({ error: "Forbidden domain" });
       return;
    }

    // Proxy request with proper headers
    const response = await axios.get(targetUrl.toString(), {
      responseType: "stream",
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": targetUrl.origin
      }
    });

    // Handle redirects
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.location;
      if (!location) throw new Error("Invalid redirect");
      return res.redirect(new URL(location, targetUrl).toString());
    }

    // Stream response with proper headers
    res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600");
    response.data.pipe(res);

    // Handle client disconnect
    req.on("close", () => response.data.destroy());

  } catch (error: unknown) {
    logger.error(`Proxy error: ${error instanceof Error ? error.message : "Unknown error"}`);
    if (res.headersSent) return;
    
    const status = axios.isAxiosError(error) ? error.response?.status || 500 : 500;
    const message = error instanceof Error ? error.message : "Proxy failed";
    res.status(status).json({ error: message });
  }
});


// Security Validation
function isValidUrl(url: URL): boolean {
  const allowedDomains = [
    "netmagcdn.com",
    "megastatics.com"
  ];

  // Remove port from hostname
  const hostname = url.hostname;

  return (
    url.protocol === "https:" &&
    allowedDomains.some(domain => {
      const domainParts = domain.split(".");
      const hostParts = hostname.split(".");
      return hostParts.slice(-domainParts.length).join(".") === domain;
    }) &&
    !!hostname &&
    !/^(localhost|127\.|192\.168\.|10\.)/i.test(hostname)
  );
}

// OPTIONS Handler
app.options("/api/anime/proxy/*", (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error Handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Server error: ${err instanceof Error ? err.message : "Unknown error"}`);
  res.status(500).json({ error: "Internal server error" });
});

export default app;