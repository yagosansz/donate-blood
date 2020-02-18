// Server configuration
const express = require('express');
const server = express();

// Config server to display static files
server.use(express.static('public'));

// Config template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
  express: server
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


// Starting server and allowing access through port 3333
server.listen(3333, () => {
  console.log('Starting server...');
});