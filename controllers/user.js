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
            // admin is set to false by default
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
            id: user._id,
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
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await models.User.find().select("-__v -password");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await models.User.findById(req.params.id).select("-__v -password");
        if (!user) {
            return res.status(404).send({
                message: "User Not Found!",
            });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const allowedUpdates = ["pseudo", "email", "password", "isAdmin"];
        const isValidUpdate = Object.keys(updates).every(update => allowedUpdates.includes(update));
        const currentUser = await models.User.findById(req.userId);

        if (!isValidUpdate) {
            return res.status(400).send({ message: "Invalid updates!" });
        }

        if (updates.hasOwnProperty('isAdmin') && !currentUser.isAdmin) {
            return res.status(403).send({ message: 'Only administrators can modify the isAdmin field.' });
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await models.User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-__v -password");

        if (!updatedUser) {
            return res.status(404).send({ message: "User Not Found!" });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};