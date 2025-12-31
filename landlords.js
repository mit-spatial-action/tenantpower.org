import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {getPropsByClst, getPropsByLoc } from './queries.js'; // Note: you might need to adjust the export in queries.js
import ejs from 'ejs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/props/clst/:clst', getPropsByClst)
app.get('/props/xy/:lng/:lat/:cnt', getPropsByLoc)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});