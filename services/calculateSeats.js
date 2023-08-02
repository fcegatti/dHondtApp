const calculateSeats = (votesData) => { 
  const {type, province, parties} = votesData;
  console.log("Iniciando calculateSeats");
  // Extraemos la comunidad autónoma específica y sus provincias
  const votes = votesData.parties.reduce((acc, party) => {
    acc[party.name] = party.votes;
    return acc;
  }, {});

  const electionType = votesData.type;
  const provinceName = votesData.province;

  const community = electionsData.autonomousCommunities.find(c => c.name === votesData.community);
  if (!community) throw new Error('La comunidad autónoma especificada no se encontró en los datos geográficos.');

  // Extraemos la provincia específica
  const provinceData = community.provinces.find(p => p.name === provinceName);
  if (!provinceData) throw new Error('La provincia especificada no se encontró en los datos geográficos de la comunidad autónoma.');

  // Si estamos calculando para las elecciones municipales, extraemos el municipio específico
  let municipality = null;
  if (electionType === 'municipales') {
    municipality = province.municipalities.find(m => m.name === municipality);
    if (!municipality) throw new Error('El municipio especificado no se encontró en los datos geográficos de la provincia.');
  }

  // Determinamos el total de escaños a repartir en función del tipo de elección
  let totalSeats = 0;
  switch (electionType) {
    case 'generales':
      totalSeats = provinceData.congressSeats;
      break;
    case 'autonomicas':
      totalSeats = provinceData.parliamentSeats;
      break;
    case 'municipales':
      totalSeats = municipality.cityHallSeats;
      break;
    default:
      throw new Error('El tipo de elección especificado no es válido. Debe ser "generales", "autonomicas" o "municipales".');
  }

  let threshold = 0; 
  switch (electionType) {
    case 'generales':
      threshold = 0.03;
      break;
    case 'municipales':
      threshold = 0.05;
      break;
    case 'autonomicas':
      threshold = provinceData.electoralThreshold;
      break;
    default:
      throw new Error('El tipo de elección especificado no es válido. Debe ser "generales", "autonomicas" o "municipales".');
  }

  const castedVotes = votesData.parties.reduce((total, party) => total + party.votes, 0);

  const validVotes = castedVotes - (votes['votos nulos'] || 0);

  const thresholdVotes = threshold * validVotes;

  // Creamos un array para almacenar los resultados de cada partido

  let results = Object.keys(votes).map(party => ({
    party,
    votes: votes[party], // Inicializamos los votos con los datos proporcionados
    seats: 0,
    quotient: votes[party], // El cociente inicial es el número de votos
    percentage: (votes[party] / castedVotes) * 100, 
    
  }));

  const validParties = results.filter(party => party.party !== 'votos nulos' && party.party !== 'votos en blanco');
  console.log(results);
  const eligibleParties = validParties.filter(party => party.votes >= thresholdVotes);

  // Repartimos los escaños utilizando el método D'Hondt
  for (let i = 0; i < totalSeats; i++) {
    const maxQuotient = Math.max(...eligibleParties.map(r => r.quotient));
    const winner = results.find(r => r.quotient === maxQuotient);
    if (winner) {
      winner.seats++;
      winner.quotient = winner.votes / (winner.seats + 1);
    }
    
  }

  // Devolvemos los resultados de cada partido
  return results.map(r => ({ party: r.party, seats: r.seats, percentage: r.percentage }));
};

module.exports = calculateSeats;
