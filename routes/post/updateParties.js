const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData.json');
const fs = require('fs');
const path = require('path');

router.post('/updateParties', (req, res) => {
  const { acName, parties } = req.body;

  if (!acName || !parties) {
    return res.status(400).json({ message: 'Required information unavailable.' });
  }

  const acData = electionsData.autonomousCommunities.find(ac => ac.name === acName);

  if (!acData) {
    return res.status(404).json({ message: 'Autonomous community not found.' });
  }

  acData.parties = parties;

  try {
    fs.writeFileSync(path.join(__dirname, '../../data/electionsData.json'), JSON.stringify(electionsData, null, 2));
    res.json({ message: 'Parties successfully updated.'});
  } catch (error) {
    console.error('Error while saving in electionsData.json', error);
    res.status(500).json({ message: 'An error occurred while updating data.'});
  }
});

module.exports = router;