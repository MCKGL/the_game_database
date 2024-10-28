const mongoose = require('mongoose');

// process.env.DB_URL is pointing to the .env file which contains the DB_URL variable
// you need to add require('dotenv').config(); in the app.js file so that process.env.DB_URL is defined
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));