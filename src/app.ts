import express from "express";
import gogoRoute from './routes/gogo-route';
import zoroRoute from './routes/zoro-route';
import _9animeRoute from './routes/9anime-route';
const path = require('path');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'apiInfo.html'));
});
console.log(path.join(__dirname, 'apiInfo.html'));


app.use('/api/gogoanime',gogoRoute)
app.use('/api/zoroanime',zoroRoute)
app.use('/api/9anime',_9animeRoute)

export default app;
