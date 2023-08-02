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



app.get('/', (req, res) => {
  res.send('Te calculo los escaños');
});

app.get('/electionForm', (req, res) => {
  res.render('electionForm');
});

app.get('/api/elections', (req, res) => {
  res.json(geography);
});

app.get('/api/seats/:ac/:province?', (req, res) => {
  const { ac, province} = req.params;
  
  const acData = geography.autonomousCommunities.find(acItem => acItem.name === ac);

  if (!acData) {
    return res.status(400).json({ message: 'nombre de comunidad autónoma no válido'});
  }

  if (province) {
    const provinceData = acData.provinces.find(p => p.name === province);

    if (!provinceData) {
      return res.status(400).json({ message: 'nombre de provinvia no válido'});
    }

    return res.json({ totalSeats: provinceData.congressSeats });
  }

  const totalSeats = acData.provinces.reduce((total, p) => total + p.congressSeats, 0);

  res.json({ totalSeats })
  
});



