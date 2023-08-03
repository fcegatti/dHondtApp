const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData.json');

router.get('/:ac/:province?', (req, res) => {
  const { ac, province} = req.params;
  
  const acData = electionsData.autonomousCommunities.find(acItem => acItem.name === ac);

  if (!acData) {
    return res.status(400).json({ message: 'invalid autonomous community name'});
  }

  if (province) {
    const provinceData = acData.provinces.find(p => p.name === province);

    if (!provinceData) {
      return res.status(400).json({ message: 'invalid province name'});
    }

    return res.json({ totalSeats: provinceData.congressSeats });
  }

  const totalSeats = acData.provinces.reduce((total, p) => total + p.congressSeats, 0);

  res.json({ totalSeats })
  
});

module.exports = router;