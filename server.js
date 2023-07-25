const express = require('express');
const app = express();
const port = 3000;
const { elections, calculateSeats } = require('./elections');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Te calculo los escaños');
});

app.get('/electionForm', (req, res) => {
  res.render('electionForm');
});

app.post('/electionForm', (req, res) => {
  // Aquí es donde extraigo los datos del formulario del objeto req.body
  // Por ejemplo:
  // const electionType = req.body.electionType;
  // const electionName = req.body.electionName;
  
  // Después de extraer los datos, puedo procesarlos por ejemplo, guardándolos en una base de datos o usarlos para calcular algo
  
  // Finalmente, puedo responder al cliente, por ejemplo, redirigiendo a otra página o enviando un mensaje
  // res.redirect('/someOtherPage');
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
