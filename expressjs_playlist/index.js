const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
//const db = require('./queries');
const port = 3090;
//const Joi = require('joi');

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
  const musician = musicians.find(c => c.id === parseInt(req.params.id));
  if (!musician) return res.status(404).send('The ID was not given');

  const {
    error
  } = validateMusician(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  musician.name = req.body.name;
  res.send(musician);
});

app.delete('/api/musicians/:id', (req, res) => {
  const musician = musicians.find(c => c.id === parseInt(req.params.id));
  if (!musician) return res.status(404).send('The ID was not given');

  const index = musicians.indexOf(musician);
  musicians.splice(index, 1);

  res.send(musician);
});

app.get('/api/musicians/:id', (req, res, next) => {
  const musician = musicians.find(m => m.id === parseInt(req.params.id));
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

app.listen(port, () => {
  console.log(`Running on port ${port}. lets add it on a db`);
});













/*

// create a playlist 
app.post('/api/plalist', (req, res) => {
  // Create a playlist and return playlist object 
  resn.send(musicians);
});

//Getting all the musicians and sort it from A - Z
app.get('/api/playlist', (req, res, next) => {
  // To read query string parameters (?sortBy=name)
  //const sortBy = req.query.sortBy;
  musicians.sortBy((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);

  // return the musicians
  res.send(musicians); 
  next();
});

// Updating a playlist
app.put('/api/playlist/:id', (req, res) => {

  // If musicians not found, return 404, otherwise update it
  // and return the updated object.
  });


// Getting a single musicians
app.get('/api/playlist/:id', (req, res, next) => {
  const musiciansId = req.params.id;

  // Lookup the musicians
  // If not found, return 404
  res.status(404).send('musician not found.');
  // Else, return the musicians object
  res.send(musicians);
  next();
  });
  


  // Deleting a musicians
  app.delete('/api/musicianss/:id', (req, res) => {
  // If musicians not found, return 404, otherwise delete it
  // and return the deleted object.
  });

  // Listen on port 3000
app.listen(3090, () => console.log('Listening...'));

// Reading the port from an environment variable
//const port = process.env.PORT || 3000;
app.listen(port);

*/

/*
app.get('/', (req, res) => {
  res.json({
    info: 'Node.js, Express, and Postgres API, This is killing me slowing'
  });
});\
*/