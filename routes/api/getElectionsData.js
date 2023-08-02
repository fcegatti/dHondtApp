const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData.js');

router.get('/', function(req, res) {
  res.json(electionsData);
});

module.exports = router;
