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





```
//contenido del archivo 
//fin del archivo
```