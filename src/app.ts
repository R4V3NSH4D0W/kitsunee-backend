import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Kitsunee from './app/kitsunee';
import gogoRoute from './routes/gogo-route';
import zoroRoute from './routes/zoro-route';
import _9animeRoute from './routes/9anime-route';
import path from 'path';

const app = express();

// Middleware
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// Server-Side Rendering (SSR) logic
app.get('/', (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(Kitsunee));

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>SSR with React</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <div id="root">${appString}</div>
      <script src="/script.js"></script>
    </body>
  </html>
  `;
  res.send(html);
});

// Routes
app.use('/api/gogoanime', gogoRoute);
app.use('/api/zoroanime', zoroRoute);
app.use('/api/9anime', _9animeRoute);

export default app;
