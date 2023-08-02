app.post('/electionForm', (req, res) => {
  // Aquí es donde extraigo los datos del formulario del objeto req.body
  // Por ejemplo:
  // const electionType = req.body.electionType;
  // const electionName = req.body.electionName;
  
  // Después de extraer los datos, puedo procesarlos por ejemplo, guardándolos en una base de datos o usarlos para calcular algo
  
  // Finalmente, puedo responder al cliente, por ejemplo, redirigiendo a otra página o enviando un mensaje
  // res.redirect('/someOtherPage');
  res.send('Form data received');
});


app.get('/election/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const election = elections.find(e => e.id === id);
  if (election) {
    res.json(election);
  } else {
    res.status(404).json({message: 'Election not found'});
  }
});

app.get('/', (req, res) => {
  res.send('Te calculo los escaños');
});

app.get('/electionForm', (req, res) => {
  res.render('electionForm');
});



app.get('/api/seats/:ac/:province?', (req, res) => {
  const { ac, province} = req.params;
  
  const acData = geography.autonomousCommunities.find(acItem => acItem.name === ac);

  if (!acData) {
    return res.status(400).json({ message: 'nombre de comunidad autónoma no válido'});
  }

  if (province) {
    const provinceData = acData.provinces.find(p => p.name === province);

    if (!provinceData) {
      return res.status(400).json({ message: 'nombre de provinvia no válido'});
    }

    return res.json({ totalSeats: provinceData.congressSeats });
  }

  const totalSeats = acData.provinces.reduce((total, p) => total + p.congressSeats, 0);

  res.json({ totalSeats })
  
});

```
//contenido del archivo 
//fin del archivo
```