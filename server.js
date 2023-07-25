const express = require('express');
const app = express();
const port = 3000;
const elections = require('./elections');
const { calculateSeats } = require('./elections');

app.get('/', (req, res) => {
  res.send('Te calculo los escaños');
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
