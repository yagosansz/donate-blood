// Server configuration
const express = require('express');
const server = express();

// Config server to display static files
server.use(express.static('public'));

// Enable express to take data from the body/form 
server.use(express.urlencoded({ extended: true }));

// Config template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
  express: server,
  noCache: true,
});

// Donors' list
const donors = [
  {
    name: 'Yago Santos',
    bloodType: 'AB+'
  },
  {
    name: 'Helena Zurg',
    bloodType: 'B+'
  },
  {
    name: 'Jessica Ramos',
    bloodType: 'A-'
  },
  {
    name: 'Hugo Schutz',
    bloodType: 'O+'
  }
];

// Start page configuration
server.get('/', (req, res) => {
  return res.render('index.html', { donors });
});

server.post('/', (req, res) => {
  // Retrive data from form
  const { name, email, bloodType } = req.body;

  donors.push({ name, bloodType });

  return res.redirect("/");

});


// Starting server and allowing access through port 3333
server.listen(3333, () => {
  console.log('Starting server...');
});