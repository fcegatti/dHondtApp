const express = require('express');
const app = express();
const port = 3000;

// Importamos nuestros módulos de rutas
const mainPostRoutes = require('./routes/post/main');
const postRoutes = require('./routes/post');
const mainGetRoutes = require('./routes/views/main');
const getElectionsData = require('./routes/api/getElectionsData');
const calculateSeats = require('./routes/api/calculateSeats');
const getSeatsData = require('./routes/api/seats');
const homeRoutes = require('./routes/views/home');
const viewRoutes = require('./routes/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

// usamos nuestros módulos de rutas con express
app.use('/api/elections', getElectionsData);
app.use('/api/calculateSeats', calculateSeats);
app.use('/api/seats', getSeatsData);
app.use('/', mainGetRoutes);
app.use('/', mainPostRoutes);
app.use('/', viewRoutes);
app.use('/', postRoutes);
app.use('/', homeRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});







