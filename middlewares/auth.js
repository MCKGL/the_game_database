const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require('fs');
const models = require("../models");

const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY, 'utf8');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const csrfToken = req.headers["x-csrf-token"];

        if (!token) {
            return res.status(401).send({ message: "No token provided!" });
        }

        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

        if (decoded.csrfToken !== csrfToken) {
            return res.status(403).send({ message: "Invalid CSRF token!" });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(400).send({ message: "Invalid token!" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await models.User.findById(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User Not Found!"
            });
        }
        if (user.isAdmin === true) {
            next();
        } else {
            res.status(403).send({
                message: "Require administrator role!"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const isAdminOrUser = async (req, res, next) => {
    try {
        const currentUser = await models.User.findById(req.userId);
        const requestedUserId = req.params.id;
        if (!currentUser) {
            return res.status(404).send({
                message: "User Not Found!"
            });
        }
        if (currentUser.isAdmin === true || currentUser.id === requestedUserId) {
            next();
        } else {
            res.status(403).send({
                message: "Require administrator role or user is the owner!"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

const auth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAdminOrUser: isAdminOrUser
}

module.exports = auth;