const express = require('express');
const router = express.Router();
const electionsData = require('../../data/electionsData.json');

router.get('/:ac?/:province?', (req, res) => {
  console.log("Entrada a /api/seats exitosa");
  const { ac, province} = req.params;

  if (!ac || ac === 'total') {
    const totalSeats = electionsData.autonomousCommunities.reduce((total, acItem) => total + acItem.provinces.reduce((totalProv, prov) => totalProv + prov.congressSeats, 0), 0);

    const assignedSeats = electionsData.autonomousCommunities.reduce((total, acItem) => total + (acItem.parties ? acItem.parties.reduce((totalParty, party) => totalParty + party.seats, 0) : 0), 0);

    const unassignedSeats = totalSeats - assignedSeats;

    return res.json({ totalSeats, unassignedSeats });
  } else {
    console.log("Nombre de la comunidad autónoma:", ac);
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

    const assignedSeats = acData.parties ? acData.parties.reduce((total, party) => total + party.seats, 0) : 0;
    const unassignedSeats = totalSeats - assignedSeats;

    console.log("Total Seats:", totalSeats);
    console.log("Total Assigned Seats:", assignedSeats);
    console.log("Unassigned Seats:", unassignedSeats);

    res.json({ totalSeats, unassignedSeats });
  } 
});

module.exports = router;