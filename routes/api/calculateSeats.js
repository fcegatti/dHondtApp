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
      return res.status(400).json({ message: 'Invalid community provided' });
    }

    const provinceData = acData.provinces.find(p => p.name === votesData.province);
    if (!provinceData) {
      return res.status(400).json({ message: 'Invalid province provided' });
    }

    for (const party of votesData.parties) {
      const acParty = acData.parties.find(p => p.name === party.name);
      if (acParty) {
        acParty.color = party.color;
        acParty.logo = party.logo;
      } else {
        acData.parties.push({
          name: party.name,
          color: party.color,
          logo: party.logo,
        });
      }
    }

    provinceData.partyData = seatResults;

    fs.writeFileSync(path.join(__dirname, '../../data/electionsData.json'), JSON.stringify(electionsData, null, 2));

    res.json(seatResults);
    
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({message: 'An error occurred while calculating seats'})
  }  
});

module.exports = router;