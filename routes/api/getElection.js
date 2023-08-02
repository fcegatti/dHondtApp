const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData');

app.get('/election/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const election = electionsData.find(e => e.id === id);
  if (election) {
    res.json(election);
  } else {
    res.status(404).json({message: 'Election not found'});
  }
});

module.exports = router;