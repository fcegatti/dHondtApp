const express = require('express');
const router = express.Router();
const calculateSeats = require('../../services/calculateSeats');

router.post('/calculateSeats', (req, res) => {
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
    res.json(seatResults);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({message: 'An error occurred while calculating seats'})
  }  
});

module.exports = router;