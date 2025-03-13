import express from "express";
import axios from "axios";
import gogoRoute from './routes/gogo-route';
import zoroRoute from './routes/zoro-route';
import _9animeRoute from './routes/9anime-route';
import path from "path";
import logger from "./utils/logging";
import { Request, Response, NextFunction } from "express";

const app = express();
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



// Middlewares
app.get("/api/anime/proxy/:host/*", async (req: Request, res: Response): Promise<void> => {
  const userAgent = req.headers['user-agent'] || '';
  const isAndroid = /android/i.test(userAgent);
  
  logger.info(`[${isAndroid ? 'ANDROID' : 'IOS'}] Proxy request to: ${req.url}`, {
    headers: req.headers,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  try {
    const encodedHost = req.params.host;
    const encodedPathSegments = req.params[0]?.split("/") || [];
    
    const host = decodeURIComponent(encodedHost);
    const path = encodedPathSegments
      .map(segment => decodeURIComponent(segment))
      .join("/");

    const targetUrl = new URL(`https://${host}/${path}`);

    if (!isValidUrl(targetUrl)) {
       res.status(403).json({ error: "Forbidden domain" });
       return;
    }

    const response = await axios.get(targetUrl.toString(), {
      responseType: "stream",
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": targetUrl.origin
      }
    });

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

    res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600");
    response.data.pipe(res);

    req.on("close", () => response.data.destroy());

  } catch (error: unknown) {
    logger.error(`Proxy error: ${error instanceof Error ? error.message : "Unknown error"}`);
    if (res.headersSent) return;
    
    const status = axios.isAxiosError(error) ? error.response?.status || 500 : 500;
    const message = error instanceof Error ? error.message : "Proxy failed";
    res.status(status).json({ error: message });
  }
});




function isValidUrl(url: URL): boolean {
  const allowedDomains = [
    "netmagcdn.com",
    "megastatics.com"
  ];
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

app.options("/api/anime/proxy/*", (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Server error: ${err instanceof Error ? err.message : "Unknown error"}`);
  res.status(500).json({ error: "Internal server error" });
});

export default app;