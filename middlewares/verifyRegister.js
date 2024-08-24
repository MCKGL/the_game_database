const models = require("../models");

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const verifyRegister = {
    checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifyRegister;