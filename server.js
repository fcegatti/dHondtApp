const express = require('express');
const app = express();
const port = 3000;
const elections = require('./elections');

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
