const express = require('express');
const app = express();
const port = 3000;

// Importamos nuestros módulos de rutas
//const mainPostRoutes = require('./routes/post/main');
const postRoutes = require('./routes/post/main');
const mainGetRoutes = require('./routes/views/main');
const getElection = require('./routes/api/getElection');
const getElectionsData = require('./routes/api/getElectionsData');
const getACPartiesRoute = require('./routes/api/getACParties');
const calculateSeats = require('./routes/api/calculateSeats');
const getSeatsData = require('./routes/api/seats');
const homeRoutes = require('./routes/views/home');
const viewRoutes = require('./routes/api/view');
const updatePartiesRoute = require('./routes/post/updateParties')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/helpers', express.static('helpers'));

// usamos nuestros módulos de rutas con express
app.use('/post', updatePartiesRoute);
app.use('/api/elections', getElectionsData);
app.use('/api/calculateSeats', calculateSeats);
app.use('/api/seats', getSeatsData);
app.use('/api/view', viewRoutes);
app.use('/api/getACParties', getACPartiesRoute);
app.use('/api', getElection);
app.use('/', homeRoutes);
app.use('/', mainGetRoutes);
//app.use('/', mainPostRoutes);
app.use('/', postRoutes);



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});