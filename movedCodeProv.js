app.get('/election/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const election = elections.find(e => e.id === id);
  if (election) {
    res.json(election);
  } else {
    res.status(404).json({message: 'Election not found'});
  }
});


app.get('/electionForm', (req, res) => {
  res.render('electionForm');
});





```
//contenido del archivo 
//fin del archivo
```