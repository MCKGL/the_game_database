const Game = require('../models/game');

exports.createGame = (req, res, next) => {
    const game = new Game({
        gameName: req.body.gameName,
        overview: req.body.overview,
        posterPath: req.body.posterPath
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