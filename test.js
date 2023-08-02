const { calculateSeats } = require('./elections');
const votesData = {
  "type": "generales",
  "province": "Barcelona",
  "community": "Catalunya",
  "parties": [
      {
          "name": "ECP",
          "votes": 402527
      },
      {
          "name": "Junts",
          "votes": 256231
      },
      {
          "name": "PSOE",
          "votes": 946055
      },
      {
          "name": "PP",
          "votes": 363857
      },
      {
          "name": "ERC",
          "votes": 326388
      },
      {
          "name": "Vox",
          "votes": 200138
      },
      {
          "name": "CUP",
          "votes": 66656
      },
      {
          "name": "Pacma",
          "votes": 27874
      },
      {
          "name": "PDECAT E CiU",
          "votes": 24216
      },
      {
          "name": "FO",
          "votes": 5989
      },
      {
          "name": "Recortes Cero",
          "votes": 2976
      },
      {
          "name": "PCTC",
          "votes": 2783
      },
      {
          "name": "votos en blanco",
          "votes": 20899
      },
      {
          "name": "votos nulos",
          "votes": 20960
      },
      {
          "name": "Cs",
          "votes": 0
      }
  ]
}
const results = calculateSeats(votesData);

console.log(results);