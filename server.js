// Server configuration
const express = require('express');
const server = express();

// Config server to display static files
server.use(express.static('public'));

// Enable express to take data from the body/form 
server.use(express.urlencoded({ extended: true }));

// Config connection with database
const Pool = require('pg').Pool;
const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'donate_blood'
});



// Config template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
  express: server,
  noCache: true,
});

// Donors' list
// const donors = [
//   {
//     name: 'Yago Santos',
//     bloodType: 'AB+'
//   },
//   {
//     name: 'Helena Zurg',
//     bloodType: 'B+'
//   },
//   {
//     name: 'Jessica Ramos',
//     bloodType: 'A-'
//   },
//   {
//     name: 'Hugo Schutz',
//     bloodType: 'O+'
//   }
// ];

// Start page configuration
server.get('/', (req, res) => {
  const query = `SELECT * FROM donors`;
  db.query(query, function(err, result) {
    if(err) {
      console.log(err);
      return res.send('Error in the Database.');
    }
    const donors = result.rows;
    return res.render('index.html', { donors });
  })
});

server.post('/', (req, res) => {
  // Retrive data from form
  const { name, email, bloodType } = req.body;

  if(name == "" || email == "" || bloodType == "") {
    return res.send('All the fields are mandatory.');
  }

  // donors.push({ name, bloodType });
  // Add values to db
  const query = `INSERT INTO donors ("name", "email", "bloodType") VALUES ($1, $2, $3)`;

  const data = [name, email, bloodType];
  db.query(query, data, function(err) {
    if(err) {
      console.log(err);
      return res.send('Error in the Database.');
    }

    return res.redirect("/");
  });

});


// Starting server and allowing access through port 3333
server.listen(3333, () => {
  console.log('Starting server...');
});