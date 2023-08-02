const express = require('express');
const app = express();
const port = 3000;

// Importamos nuestros módulos de rutas
const apiRoutes = reqire('./routes/api');
const viewRoutes = reqire('./routes/views');
const postRoutes = reqire('./routes/post');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

// usamos nuestros módulos de rutas con express
app.use('/api', apiRoutes);
app.use('/', viewRoutes);
app.use('/', postRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});







