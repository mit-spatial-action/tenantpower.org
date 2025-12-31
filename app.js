import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.APP_PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});

app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});