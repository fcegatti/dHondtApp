const express = require('express');
const app = express();
const port = 3000;
const { geography, calculateSeats } = require('./elections');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

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


app.post('/electionForm', (req, res) => {
  // Aquí es donde extraigo los datos del formulario del objeto req.body
  // Por ejemplo:
  // const electionType = req.body.electionType;
  // const electionName = req.body.electionName;
  
  // Después de extraer los datos, puedo procesarlos por ejemplo, guardándolos en una base de datos o usarlos para calcular algo
  
  // Finalmente, puedo responder al cliente, por ejemplo, redirigiendo a otra página o enviando un mensaje
  // res.redirect('/someOtherPage');
  res.send('Form data received');
});

app.post('/calculateSeats', (req, res) => {
  // Extraer los datos del formulario del objeto req.body
  const votesData = req.body;
  console.log('votesData:', votesData);
  // Validar los datos
  if (!votesData || !votesData.type || !votesData.province || !votesData.community ||!votesData.parties) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {

    // Calcular los escaños
    const seatResults = calculateSeats(votesData);
    res.json(seatResults);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({message: 'An error occurred while calculating seats'})
  }  
});



app.get('/election/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const election = elections.find(e => e.id === id);
  if (election) {
    res.json(election);
  } else {
    res.status(404).json({message: 'Election not found'});
  }
});

app.get('/test', (req, res) => {
  const testVotes = [
    { party: "Party 1", votes: 500000 },
    { party: "Party 2", votes: 400000 },
    { party: "Party 3", votes: 300000 },
    { party: "Party 4", votes: 200000 },
    { party: "Party 5", votes: 100000 },
  ];

  const seatResults = calculateSeats(testVotes, 10);
  res.json(seatResults);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
