const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3090;
const Joi = require('joi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.json());

const musician = [{
    id: 1,
    name: 'Ludacris',
    song: 'My chick bad'
  },

  {
    id: 2,
    name: 'Lil Wayne',
    song: 'Uproar'
  },
  {
    id: 3,
    name: 'Beyonce',
    song: 'Dance for you'
  },
  {
    id: 4,
    name: 'Bone Thugs N Harmony',
    song: 'Cross roads'
  },
  {
    id: 5,
    name: 'T.I',
    song: 'Whatever you want'
  },
];


//let fetch();

app.get('/api/musician', (req, res, next) => {
  res.send(musician);
  next();
});


// create a playlist 
app.post('/api/musician', (req, res) => {
  const {
    error
  } = validateMusician(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const musician = {
    id: musicians.length + 1,
    name: req.body.name
  };
  musicians.push(musician);
  res.send(musician);
});

app.put('/api/musicians/:id', (req, res) => {
  const musician = musicians.find(c => c.name === parseInt(req.params.nae));
  if (!musician) return res.status(404).send('The name was not given');

  const {
    error
  } = validateMusician(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  musician.name = req.body.name;
  res.send(musician);
});

// delete by Id
app.delete('/api/musicians/:id', (req, res) => {
  const musician = musicians.find(c => c.id === parseInt(req.params.id));
  if (!musician) return res.status(404).send('The ID was not given');

  const index = musicians.indexOf(musician);
  musicians.splice(index, 1);

  res.send(musician);
});

app.get('/api/musicians/:id', (req, res, next) => {
  const musician = musicians.find(m => m.name === parseInt(req.params.name));
  if (!musician) return res.status(404).send('The ID was not given');
  res.send(musician);
  next();
});

function validateMusician(musician) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(musician, schema);
}


app.listen(port, () => Console.log(`Listerning on port ${port}...`));



app.get('/users', db.getMusicians);
app.get('/users/:id', db.getMusiciansById);
app.post('/users', db.createMusicians);
app.put('/users', db.updateMusicians);
app.delete('/users/:id', db.deleteMusicians);