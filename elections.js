// Datos de muestra para las elecciones
const geography = {
  autonomousCommunities: [
    {
      name: "Andalucía",
      provinces: [
        {
          name: 'Almería',
          municipalities: [],
        },
        {
          name: 'Cádiz',
          municipalities: [],
        },
        {
          name: 'Córdoba',
          municipalities: [],
        },
        {
          name: 'Granada',
          municipalities: [],
        },
        {
          name: 'Huelva',
          municipalities: [],
        },
        {
          name: 'Jaén',
          municipalities: [],
        },
        {
          name: 'Málaga',
          municipalities: [],
        },
        {
          name: 'Sevilla',
          municipalities: [],
        },
      ]
    },
    { name: "Aragón",
      provinces: [
        {
          name: 'Huesca',
          municipalities: [],
        },
        {
          name: 'Teruel',
          municipalities: [],
        },
        {
          name: 'Zaragoza',
          municipalities: [],
        }, 
      ]
    },
    { name: "Canarias",
      provinces: [
        {
          name: 'Las Palmas',
          municipalities: [],
        },
        {
          name: 'Santa Cruz de Tenerife',
          municipalities: [],
        }, 
      ]
    },
    { name: "Cantabria",
      provinces: [
        {
          name: 'Cantabria',
          municipalities: [],
        },
      ]
    },
    { name: "Castilla-La Mancha",
      provinces: [
        {
          name: 'Albacete',
          municipalities: [],
        },
        {
          name: 'Ciudad Real',
          municipalities: [],
        },
        {
          name: 'Cuenca',
          municipalities: [],
        },
        {
          name: 'Guadalajara',
          municipalities: [],
        },
        {
          name: 'Toledo',
          municipalities: [],
        },  
      ]
    },
    {
      name: "Castilla y León",
      provinces: [
        {
          name: 'Ávila',
          municipalities: [],
        },
        {
          name: 'Burgos',
          municipalities: [],
        },
        {
          name: 'León',
          municipalities: [],
        },
        {
          name: 'Palencia',
          municipalities: [],
        },
        {
          name: 'Salamanca',
          municipalities: [],
        },
        {
          name: 'Segovia',
          municipalities: [],
        },
        {
          name: 'Soria',
          municipalities: [],
        },
        {
          name: 'Valladolid',
          municipalities: [],
        },
        {
          name: 'Zamora',
          municipalities: [],
        },
      ]
    },
    { name: "Catalunya",
      provinces: [
        {
          name: 'Barcelona',
          municipalities: [],
        },
        {
          name: 'Girona',
          municipalities: [],
        },
        {
          name: 'Lleida',
          municipalities: [],
        },
        {
          name: 'Tarragona',
          municipalities: [],
        },  
      ]
    },
    { name: "Ciudad de Ceuta",
      provinces: [
        {
          name: 'Ceuta',
          municipalities: [],
        },
      ]
    },
    { name: "Ciudad de Melilla",
      provinces: [
        {
          name: 'Melilla',
          municipalities: [],
        },
      ]
    },
    { name: "Comunidad de Madrid",
      provinces: [
        {
          name: 'Madrid',
          municipalities: [],
        },
      ]
    },
    { name: "Comunidad Foral de Navarra",
      provinces: [
        {
          name: 'Navarra',
          municipalities: [],
        },
      ]
    },
    { name: "Comunitat Valenciana",
      provinces: [
        {
          name: 'Alacant',
          municipalities: [],
        },
        {
          name: 'Castelló',
          municipalities: [],
        },
        {
          name: 'València',
          municipalities: [],
        }, 
      ]
    },
    { name: "Extremadura",
      provinces: [
        {
          name: 'Badajoz',
          municipalities: [],
        },
        {
          name: 'Cáceres',
          municipalities: [],
        }, 
      ]
    },
    { name: "Galicia",
      provinces: [
        {
          name: 'A Coruña',
          municipalities: [],
        },
        {
          name: 'Lugo',
          municipalities: [],
        },
        {
          name: 'Ourense',
          municipalities: [],
        },
        {
          name: 'Pontevedra',
          municipalities: [],
        },  
      ]
    },
    { name: "Illes Balears",
      provinces: [
        {
          name: 'Illes Balears',
          municipalities: [],
        },
      ]
    },
    { name: "La Rioja",
      provinces: [
        {
          name: 'La Rioja',
          municipalities: [],
        },
      ]
    },
    { name: "País Vasco",
      provinces: [
        {
          name: 'Álava',
          municipalities: [],
        },
        {
          name: 'Guipúzcoa',
          municipalities: [],
        },
        {
          name: 'Vizcaya',
          municipalities: [],
        }, 
      ]
    },
    { name: "Principado Asturias",
      provinces: [
        {
          name: 'Asturias',
          municipalities: [],
        },
      ]
    },
    { name: "Región de Murcia",
      provinces: [
        {
          name: 'Murcia',
          municipalities: [],
        },
      ]
    },

  ]
}

const elections = [
  {
    id: 1,
    type: 'Generales',
    seats: 350,
    autonomousCommunities: [
      {
        name: "Andalucía",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Almería',
            seats: 6,
          },
          {
            name: 'Cádiz',
            seats: 9,
          },
          {
            name: 'Córdoba',
            seats: 6,
          },
          {
            name: 'Granada',
            seats: 7,
          },
          {
            name: 'Huelva',
            seats: 5,
          },
          {
            name: 'Jaén',
            seats: 5,
          },
          {
            name: 'Málaga',
            seats: 11,
          },
          {
            name: 'Sevilla',
            seats: 12,
          },
        ]
      },
      { name: "Aragón",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Huesca',
            seats: 3,
          },
          {
            name: 'Teruel',
            seats: 3,
          },
          {
            name: 'Zaragoza',
            seats: 7,
          },
        ]
      },
      { name: "Canarias",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Las Palmas',
            seats: 8,
          },
          {
            name: 'Santa Cruz de Tenerife',
            seats: 7,
          },
        ]
      },
      { name: "Cantabria",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Cantabria',
            seats: 5,
          },
        ]
      },
      { name: "Castilla-La Mancha",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Albacete',
            seats: 4,
          },
          {
            name: 'Ciudad Real',
            seats: 5,
          },
          {
            name: 'Cuenca',
            seats: 3,
          },
          {
            name: 'Guadalajara',
            seats: 3,
          },
          {
            name: 'Toledo',
            seats: 6,
          },  
        ]
      },
      {
        name: "Castilla y León",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Ávila',
            seats: 3,
          },
          {
            name: 'Burgos',
            seats: 4,
          },
          {
            name: 'León',
            seats: 4,
          },
          {
            name: 'Palencia',
            seats: 3,
          },
          {
            name: 'Salamanca',
            seats: 4,
          },
          {
            name: 'Segovia',
            seats: 3,
          },
          {
            name: 'Soria',
            seats: 2,
          },
          {
            name: 'Valladolid',
            seats: 5,
          },
          {
            name: 'Zamora',
            seats: 3,
          },
        ]
      },
      { name: "Catalunya",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Barcelona',
            seats: 32,
          },
          {
            name: 'Girona',
            seats: 6,
          },
          {
            name: 'Lleida',
            seats: 4,
          },
          {
            name: 'Tarragona',
            seats: 6,
          },
        ]
      },
      { name: "Ciudad de Ceuta",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Ceuta',
            seats: 1,
          },
        ]
      },
      { name: "Ciudad de Melilla",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Melilla',
            seats: 1,
          },
        ]
      },
      { name: "Comunidad de Madrid",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Madrid',
            seats: 37,
          },
        ]
      },
      { name: "Comunidad Foral de Navarra",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Navarra',
            seats: 5,
          },
        ]
      },
      { name: "Comunitat Valenciana",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Alacant',
            seats: 12,
          },
          {
            name: 'Castelló',
            seats: 5,
          },
          {
            name: 'València',
            seats: 16,
          },
        ]
      },
      { name: "Extremadura",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Badajoz',
            seats: 5,
          },
          {
            name: 'Cáceres',
            seats: 4,
          },
        ]
      },
      { name: "Galicia",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'A Coruña',
            seats: 8,
          },
          {
            name: 'Lugo',
            seats: 4,
          },
          {
            name: 'Ourense',
            seats: 4,
          },
          {
            name: 'Pontevedra',
            seats: 7,
          }, 
        ]
      },
      { name: "Illes Balears",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Illes Balears',
            seats: 8,
          },
        ]
      },
      { name: "La Rioja",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'La Rioja',
            seats: 4,
          },
        ]
      },
      { name: "País Vasco",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Álava',
            seats: 4,
          },
          {
            name: 'Guipúzcoa',
            seats: 6,
          },
          {
            name: 'Vizcaya',
            seats: 8,
          },
        ]
      },
      { name: "Principado Asturias",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Asturias',
            seats: 7,
          },
        ]
      },
      { name: "Región de Murcia",
        parties: ['Partido A', 'Partido B', 'Partido C', 'Partido D'],
        provinces: [
          {
            name: 'Murcia',
            seats: 10,
          },
        ]
      },
    ],  
  }, 
];

const voteData = {
  Catalunya: {
    Barcelona: {
      'Partido A': 600000,
      'Partido B': 400000,
      'Partido C': 300000,
      'Partido D': 200000,
    },
    Girona: {
      'Partido A': 200000,
      'Partido B': 150000,
      'Partido C': 100000,
      'Partido D': 50000,
    },
    Lleida: {
      'Partido A': 100000,
      'Partido B': 150000,
      'Partido C': 10000,
      'Partido D': 12000,
    },
    Tarragona: {
      'Partido A': 200000,
      'Partido B': 150000,
      'Partido C': 100000,
      'Partido D': 50000,
    },
  }
};

function calculateSeats(voteData, elections) {
  if (!Array.isArray(elections) || elections.length === 0) {
    throw new Error("El array 'elections' debe estar definido y tener al menos un elemento.");
  }

  const election = elections[0];
  
  // Creamos un objeto para almacenar los resultados totales de cada comunidad autónoma.
  const totalResults = {};
  
  // Iteramos sobre cada comunidad autónoma en los datos de voto.
  for (const communityName in voteData) {
    const communityVotes = voteData[communityName];
    const communityData = election.autonomousCommunities.find(c => c.name === communityName);
    
    // Creamos un objeto para almacenar los resultados totales de esta comunidad.
    totalResults[communityName] = {};

    // Iteramos sobre cada provincia en los datos de voto de esta comunidad.
    for (const provinceName in communityVotes) {
      const provinceVotes = communityVotes[provinceName];
      const provinceData = communityData.provinces.find(p => p.name === provinceName);
      const totalSeats = provinceData.seats;

      // Creamos un array para almacenar los resultados de cada partido en esta provincia.
      const results = Object.keys(provinceVotes).map(party => ({
        party,
        votes: provinceVotes[party],
        seats: 0,
        quotient: provinceVotes[party]
      }));

      // Repartimos los escaños utilizando el método D'Hondt.
      for (let i = 0; i < totalSeats; i++) {
        const maxQuotient = Math.max(...results.map(r => r.quotient));
        const winner = results.find(r => r.quotient === maxQuotient);
        winner.seats++;
        winner.quotient = winner.votes / (winner.seats + 1);
      }

      // Añadimos los resultados de esta provincia a los resultados totales de la comunidad.
      totalResults[communityName][provinceName] = results.map(r => ({party: r.party, seats: r.seats}));
    }
  }

  return totalResults;
}

const communityName = "Catalunya";
const results = calculateSeats(voteData, elections);
console.dir(results, { depth: null });


module.exports = {
  geography,
  elections,
  calculateSeats
};
