// Datos de muestra para las elecciones
const geography = {
  autonomousCommunities: [
    {
      name: "Andalucía",
      provinces: [
        {
          name: 'Almería',
          congressSeats: 6,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Cádiz',
          congressSeats: 9,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Córdoba',
          congressSeats: 6,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Granada',
          congressSeats: 7,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Huelva',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Jaén',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Málaga',
          congressSeats: 11,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Sevilla',
          congressSeats: 12,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Aragón",
      provinces: [
        {
          name: 'Huesca',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Teruel',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Zaragoza',
          congressSeats: 7,
          parliamentSeats: null,
          municipalities: [],
        }, 
      ]
    },
    { name: "Canarias",
      provinces: [
        {
          name: 'Las Palmas',
          congressSeats: 8,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Santa Cruz de Tenerife',
          congressSeats: 7,
          parliamentSeats: null,
          municipalities: [],
        }, 
      ]
    },
    { name: "Cantabria",
      provinces: [
        {
          name: 'Cantabria',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Castilla-La Mancha",
      provinces: [
        {
          name: 'Albacete',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Ciudad Real',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Cuenca',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Guadalajara',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Toledo',
          congressSeats: 6,
          parliamentSeats: null,
          municipalities: [],
        },  
      ]
    },
    {
      name: "Castilla y León",
      provinces: [
        {
          name: 'Ávila',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Burgos',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'León',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Palencia',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Salamanca',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Segovia',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Soria',
          congressSeats: 2,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Valladolid',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Zamora',
          congressSeats: 3,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Catalunya",
      provinces: [
        {
          name: 'Barcelona',
          congressSeats: 32,
          parliamentSeats: 85,
          municipalities: [
            {
              name: 'Badalona',
              cityHallSeats: 27,
            },
            {
              name: 'Barcelona',
              cityHallSeats: 41,
            }
          ],
        },
        {
          name: 'Girona',
          congressSeats: 6,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Lleida',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Tarragona',
          congressSeats: 6,
          parliamentSeats: null,
          municipalities: [],
        },  
      ]
    },
    { name: "Ciudad de Ceuta",
      provinces: [
        {
          name: 'Ceuta',
          congressSeats: 1,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Ciudad de Melilla",
      provinces: [
        {
          name: 'Melilla',
          congressSeats: 1,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Comunidad de Madrid",
      provinces: [
        {
          name: 'Madrid',
          congressSeats: 37,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Comunidad Foral de Navarra",
      provinces: [
        {
          name: 'Navarra',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Comunitat Valenciana",
      provinces: [
        {
          name: 'Alacant',
          congressSeats: 12,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Castelló',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'València',
          congressSeats: 16,
          parliamentSeats: null,
          municipalities: [],
        }, 
      ]
    },
    { name: "Extremadura",
      provinces: [
        {
          name: 'Badajoz',
          congressSeats: 5,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Cáceres',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        }, 
      ]
    },
    { name: "Galicia",
      provinces: [
        {
          name: 'A Coruña',
          congressSeats: 8,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Lugo',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Ourense',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Pontevedra',
          congressSeats: 7,
          parliamentSeats: null,
          municipalities: [],
        },  
      ]
    },
    { name: "Illes Balears",
      provinces: [
        {
          name: 'Illes Balears',
          congressSeats: 8,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "La Rioja",
      provinces: [
        {
          name: 'La Rioja',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "País Vasco",
      provinces: [
        {
          name: 'Álava',
          congressSeats: 4,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Guipúzcoa',
          congressSeats: 6,
          parliamentSeats: null,
          municipalities: [],
        },
        {
          name: 'Vizcaya',
          congressSeats: 8,
          parliamentSeats: null,
          municipalities: [],
        }, 
      ]
    },
    { name: "Principado Asturias",
      provinces: [
        {
          name: 'Asturias',
          congressSeats: 7,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },
    { name: "Región de Murcia",
      provinces: [
        {
          name: 'Murcia',
          congressSeats: 10,
          parliamentSeats: null,
          municipalities: [],
        },
      ]
    },

  ]
}

const calculateSeats = (votes, electionType, communityName, provinceName, municipalityName = null) => {
  // Extraemos la comunidad autónoma específica y sus provincias
  const community = geography.autonomousCommunities.find(c => c.name === communityName);
  if (!community) throw new Error('La comunidad autónoma especificada no se encontró en los datos geográficos.');

  // Extraemos la provincia específica
  const province = community.provinces.find(p => p.name === provinceName);
  if (!province) throw new Error('La provincia especificada no se encontró en los datos geográficos de la comunidad autónoma.');

  // Si estamos calculando para las elecciones municipales, extraemos el municipio específico
  let municipality = null;
  if (electionType === 'municipales') {
    municipality = province.municipalities.find(m => m.name === municipalityName);
    if (!municipality) throw new Error('El municipio especificado no se encontró en los datos geográficos de la provincia.');
  }

  // Determinamos el total de escaños a repartir en función del tipo de elección
  let totalSeats = 0;
  switch (electionType) {
    case 'generales':
      totalSeats = province.congressSeats;
      break;
    case 'autonomicas':
      totalSeats = province.parliamentSeats;
      break;
    case 'municipales':
      totalSeats = municipality.cityHallSeats;
      break;
    default:
      throw new Error('El tipo de elección especificado no es válido. Debe ser "generales", "autonomicas" o "municipales".');
  }

  // Creamos un array para almacenar los resultados de cada partido
  const results = Object.keys(votes).map(party => ({
    party,
    votes: votes[party], // Inicializamos los votos con los datos proporcionados
    seats: 0,
    quotient: votes[party], // El cociente inicial es el número de votos
  }));

  // Repartimos los escaños utilizando el método D'Hondt
  for (let i = 0; i < totalSeats; i++) {
    const maxQuotient = Math.max(...results.map(r => r.quotient));
    const winner = results.find(r => r.quotient === maxQuotient);
    winner.seats++;
    winner.quotient = winner.votes / (winner.seats + 1);
  }

  // Devolvemos los resultados de cada partido
  return results.map(r => ({ party: r.party, seats: r.seats }));
};

module.exports = {
  geography,
  calculateSeats,
};
