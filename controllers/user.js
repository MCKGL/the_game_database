const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const models = require("../models");
require("dotenv").config();
const fs = require('fs');

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8');

exports.register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.pseudo) {
            return res.status(400).send({
                message: "Missing required fields (email, password, pseudo)",
                success: false,
            });
        }
        const user = await models.User.create({
            email: req.body.email ,
            // password is hashed before being stored in the database
            password: bcrypt.hashSync(req.body.password),
            // isAdmin: req.body.isAdmin,
            pseudo: req.body.pseudo,
        });
        res.status(201).send({ success: true });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await models.User.findOne({
            email: req.body.email,
        });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password",
            });
        }

        // Generate a CSRF token with 24 random bytes
        const csrfToken = crypto.randomBytes(24).toString("hex");

        const token = jwt.sign(
            {
                id: user.id,
                csrfToken: csrfToken
            },
            privateKey,
            {
                algorithm: "RS256",
                expiresIn: 86400,
            }
        )

        res.cookie("token", token, {
            // cookies cannot be accessed through client-side script, protecting against cross-site scripting attacks (XSS)
            httpOnly: true,
            // cookie will be sent only over HTTPS
            secure: true,
            // cross-origin request will be allowed
            sameSite: "None",
        });

        res.status(200).send({
            isAdmin: user.isAdmin,
            pseudo: user.pseudo,
            csrfToken: csrfToken,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
}