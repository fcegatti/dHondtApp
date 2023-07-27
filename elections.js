// Datos de muestra para las elecciones

// El umbral electoral para las generales es del 3% y para las municipales es del 5%, en ambos casos sobre votos válidos.

const geography = {
  autonomousCommunities: [
    {
      name: "Andalucía",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Almería',
          congressSeats: 6,
          parliamentSeats: 12,
          municipalities: [],
        },
        {
          name: 'Cádiz',
          congressSeats: 9,
          parliamentSeats: 15,
          municipalities: [],
        },
        {
          name: 'Córdoba',
          congressSeats: 6,
          parliamentSeats: 12,
          municipalities: [],
        },
        {
          name: 'Granada',
          congressSeats: 7,
          parliamentSeats: 13,
          municipalities: [],
        },
        {
          name: 'Huelva',
          congressSeats: 5,
          parliamentSeats: 11,
          municipalities: [],
        },
        {
          name: 'Jaén',
          congressSeats: 5,
          parliamentSeats: 11,
          municipalities: [],
        },
        {
          name: 'Málaga',
          congressSeats: 11,
          parliamentSeats: 17,
          municipalities: [],
        },
        {
          name: 'Sevilla',
          congressSeats: 12,
          parliamentSeats: 18,
          municipalities: [],
        },
      ]
    },
    { name: "Aragón",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Huesca',
          congressSeats: 3,
          parliamentSeats: 14,
          municipalities: [],
        },
        {
          name: 'Teruel',
          congressSeats: 3,
          parliamentSeats: 14,
          municipalities: [],
        },
        {
          name: 'Zaragoza',
          congressSeats: 7,
          parliamentSeats: 35,
          municipalities: [],
        }, 
      ]
    },
    { name: "Canarias",
      electoralTreshold: 4,
      tresholdRef: 'valid',
 
    // falta modificar calculateSeats para ajustar a la especificidad canaria de 9 circunscripciones electorales, 8 inferiores a la provincia y una circuscripción autonómica para las elecciones autonómicas. Gran Canaria (15), Tenerife (15), Fuerteaventura (8), La Gomera (8), La Palma (8), La Gomera (4), El Hierro (3) y 9 para la circunscripción autonómica. La barrera electoral de las circunscripciones insulares es de 15% válidos o 4% válidos en la suma de todas las circunscripciones.
      parties: [],
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
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Cantabria',
          congressSeats: 5,
          parliamentSeats: 35,
          municipalities: [],
        },
      ]
    },
    { name: "Castilla-La Mancha",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Albacete',
          congressSeats: 4,
          parliamentSeats: 6,
          municipalities: [],
        },
        {
          name: 'Ciudad Real',
          congressSeats: 5,
          parliamentSeats: 8,
          municipalities: [],
        },
        {
          name: 'Cuenca',
          congressSeats: 3,
          parliamentSeats: 5,
          municipalities: [],
        },
        {
          name: 'Guadalajara',
          congressSeats: 3,
          parliamentSeats: 5,
          municipalities: [],
        },
        {
          name: 'Toledo',
          congressSeats: 6,
          parliamentSeats: 9,
          municipalities: [],
        },  
      ]
    },
    {
      name: "Castilla y León",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Ávila',
          congressSeats: 3,
          parliamentSeats: 7,
          municipalities: [],
        },
        {
          name: 'Burgos',
          congressSeats: 4,
          parliamentSeats: 11,
          municipalities: [],
        },
        {
          name: 'León',
          congressSeats: 4,
          parliamentSeats: 13,
          municipalities: [],
        },
        {
          name: 'Palencia',
          congressSeats: 3,
          parliamentSeats: 7,
          municipalities: [],
        },
        {
          name: 'Salamanca',
          congressSeats: 4,
          parliamentSeats: 10,
          municipalities: [],
        },
        {
          name: 'Segovia',
          congressSeats: 3,
          parliamentSeats: 6,
          municipalities: [],
        },
        {
          name: 'Soria',
          congressSeats: 2,
          parliamentSeats: 5,
          municipalities: [],
        },
        {
          name: 'Valladolid',
          congressSeats: 5,
          parliamentSeats: 15,
          municipalities: [],
        },
        {
          name: 'Zamora',
          congressSeats: 3,
          parliamentSeats: 7,
          municipalities: [],
        },
      ]
    },
    { name: "Catalunya",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
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
              electoralTreshold: 5,
            }
          ],
        },
        {
          name: 'Girona',
          congressSeats: 6,
          parliamentSeats: 17,
          municipalities: [],
        },
        {
          name: 'Lleida',
          congressSeats: 4,
          parliamentSeats: 15,
          municipalities: [],
        },
        {
          name: 'Tarragona',
          congressSeats: 6,
          parliamentSeats: 18,
          municipalities: [],
        },  
      ]
    },
    { name: "Ciudad de Ceuta",
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Ceuta',
          congressSeats: 1,
          parliamentSeats: 25,
          municipalities: [],
        },
      ]
    },
    { name: "Ciudad de Melilla",
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Melilla',
          congressSeats: 1,
          parliamentSeats: 25,
          municipalities: [],
        },
      ]
    },
    { name: "Comunidad de Madrid",
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Madrid',
          congressSeats: 37,
          parliamentSeats: 136,
          municipalities: [],
        },
      ]
    },
    { name: "Comunidad Foral de Navarra",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Navarra',
          congressSeats: 5,
          parliamentSeats: 50,
          municipalities: [],
        },
      ]
    },
    { name: "Comunitat Valenciana",
      electoralTreshold: 5,
      tresholdRef: 'casted',
      parties: [],
      provinces: [
        {
          name: 'Alacant',
          congressSeats: 12,
          parliamentSeats: 35,
          municipalities: [],
        },
        {
          name: 'Castelló',
          congressSeats: 5,
          parliamentSeats: 24,
          municipalities: [],
        },
        {
          name: 'València',
          congressSeats: 16,
          parliamentSeats: 40,
          municipalities: [],
        }, 
      ]
    },
    { name: "Extremadura",
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Badajoz',
          congressSeats: 5,
          parliamentSeats: 36,
          municipalities: [],
        },
        {
          name: 'Cáceres',
          congressSeats: 4,
          parliamentSeats: 29,
          municipalities: [],
        }, 
      ]
    },
    { name: "Galicia",
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'A Coruña',
          congressSeats: 8,
          parliamentSeats: 25,
          municipalities: [],
        },
        {
          name: 'Lugo',
          congressSeats: 4,
          parliamentSeats: 14,
          municipalities: [],
        },
        {
          name: 'Ourense',
          congressSeats: 4,
          parliamentSeats: 14,
          municipalities: [],
        },
        {
          name: 'Pontevedra',
          congressSeats: 7,
          parliamentSeats: 22,
          municipalities: [],
        },  
      ]
    },
    { name: "Illes Balears",
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
    // falta modificar calculateSeats para ajustar a la especificidad balear de 4 circunscripciones electorales inferiores a la provincia para las elecciones autonómicas. Mallorca (33), Menorca (13), Eivissa (12) y Formentera (1).

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
      electoralTreshold: 5,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'La Rioja',
          congressSeats: 4,
          parliamentSeats: 33,
          municipalities: [],
        },
      ]
    },
    { name: "País Vasco",
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Álava',
          congressSeats: 4,
          parliamentSeats: 25,
          municipalities: [],
        },
        {
          name: 'Guipúzcoa',
          congressSeats: 6,
          parliamentSeats: 25,
          municipalities: [],
        },
        {
          name: 'Vizcaya',
          congressSeats: 8,
          parliamentSeats: 25,
          municipalities: [],
        }, 
      ]
    },
    { name: "Principado Asturias",
      electoralTreshold: null,
      tresholdRef: null,
      parties: [],
    // falta modificar calculateSeats para ajustar a la excepción asuturiana de 3 circunscripciones electorales inferiores a la provincia para las elecciones autonómicas. Central (34), Occidental (6) y oriental (5)
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
      electoralTreshold: 3,
      tresholdRef: 'valid',
      parties: [],
      provinces: [
        {
          name: 'Murcia',
          congressSeats: 10,
          parliamentSeats: 45,
          municipalities: [],
        },
      ]
    },

  ]
}
/*
-En Extremadura, el umbral de votos es del 5% por circunscripción o 5% de la comunidad.
-En Valencia, el umbral es del 5% pero de los votos emitidos en toda la comunidad.
// CONFIRMAR QUE EL UMBRAL DE VOTOS DEL 5% ES SOBRE VOTOS VÁLIDOS EN CEUTA Y MELILLA

*/
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
