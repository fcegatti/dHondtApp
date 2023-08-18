const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData.json');

router.get('/parties/:ac', (req, res) => {
  console.log("Entrada a /api/getACParties exitosa");
  const { ac } = req.params;
  if (!ac) {
    return res.status(400).json({ message: 'No autonomous community provided' });
  }

  const acData = electionsData.autonomousCommunities.find(acItem => acItem.name === ac);

  if (!acData) {
    return res.status(400).json({ message: 'Autonomous community not found' });
  }
  console.log(acData.parties);
  res.json(acData.parties);
});

module.exports = router;