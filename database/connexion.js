const mongoose = require('mongoose');

// process.env.DB_URL pointe vers le fichier .env qui contient la variable DB_URL
// il faut ajouter require('dotenv').config(); dans le fichier app.js pour que process.env.DB_URL soit défini
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));