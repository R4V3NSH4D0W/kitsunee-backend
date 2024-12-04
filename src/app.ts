import express from "express";
import gogoRoute from './routes/gogo-route';
const app = express();

app.use(express.json());

app.use('/api/gogoanime',gogoRoute)

export default app;
