import express from "express";
import gogoRoute from './routes/gogo-route';
import zoroRoute from './routes/zoro-route';
import _9animeRoute from './routes/9anime-route';
import path from 'path';
import logger from "./utils/logging";
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

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error: ${err.message} | URL: ${req.method} ${req.url}`);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
