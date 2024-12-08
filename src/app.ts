import express from "express";
import gogoRoute from './routes/gogo-route';
import zoroRoute from './routes/zoro-route';
const app = express();

app.use(express.json());

app.use('/api/gogoanime',gogoRoute)
app.use('/api/zoroanime',zoroRoute)

export default app;
