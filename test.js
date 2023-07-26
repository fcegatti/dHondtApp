const { calculateSeats } = require('./elections'); // Reemplace 'elections' con el nombre correcto de su archivo

const votes = { 'PSOE': 20000, 'SUMAR': 30000, 'PP': 15000, 'Vox': 1000, 'Pacma': 5  };
const electionType = 'municipales';
const communityName = 'Catalunya';
const provinceName = 'Barcelona';
const municipalityName = 'Barcelona';
const results = calculateSeats(votes, electionType, communityName, provinceName, municipalityName);

console.log(results);