const express = require('express');
const exhbs = require('express-handlebars');

const PORT = process.env.PORT || 7777;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
  }),
);

app.get('/', (req, res) => {
  res.render('home', {
    cssFileName: 'home',
    pageTitle: 'Filmoteka',
  });
});

app.get('/my-library', (req, res) => {
  res.render('my-library.hbs', {
    cssFileName: 'my-library',
    pageTitle: 'My library',
  });
});

app.listen(PORT, () => {
  console.log('App listen 4444');
});
