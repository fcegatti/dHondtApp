const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData.json');
const calculateSeats = require('../../services/calculateSeats');
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
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

    const acData = electionsData.autonomousCommunities.find(ac => ac.name === votesData.community);
    if (!acData) {
      return res.status(400).json({ message: 'Invalid community provided'});
    }
    if (!acData.provinces || !Array.isArray(acData.provinces)) {
      return res.status(500).json({ message: 'Invalid provinces data' });
  }
    console.log(acData);
    console.log("votesData.province:", votesData.province);
    console.log("acData.provinces:", acData.provinces);

    const provinceData = acData.provinces.find(p => p.name === votesData.province);
    if (!provinceData) {
      return res.status(400).json({ message: 'Invalid province provided'});
    }
    provinceData.parties = seatResults;
    if (!acData.parties) {
      acData.parties = [];
    }
    for (const party of votesData.parties) {
      const acPartyIndex = acData.parties.findIndex(p => p.name === party.name);
      if (acPartyIndex !== -1) {
        acData.parties[acPartyIndex].votes = party.votes;
      } else {
        acData.parties.push(party);
      }
    }
    fs.writeFileSync(path.join(__dirname, '../../data/electionsData.json'), JSON.stringify(electionsData, null, 2));

    res.json(seatResults);

  } catch (error) {
    console.error('Error', error);
    res.status(500).json({message: 'An error occurred while calculating seats'})
  }  
});

module.exports = router;