const Game = require('../models/game');

// TODO : Create every dependences
// TODO : complete the createGame function
// TODO : create list
// TODO : add to list and remove from list
// TODO : add some security cors, express-rate-limit,...

exports.createGame = (req, res, next) => {
    const game = new Game({
        gameName: req.body.gameName,
        overview: req.body.overview,
        posterPath: '/' + req.files.posterPath[0].filename
    });
    game.save().then(
        () => {
            res.status(201).json({
                message: 'Game saved successfully!'
            });
        }
    ).catch(
        (error) => {
            if (error.name === 'ValidationError') {
                res.status(400).json({
                    error: error
                });
            } else {
                res.status(500).json({
                    error: error
                });
            }
        }
    );
};