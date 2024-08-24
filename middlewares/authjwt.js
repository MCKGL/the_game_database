const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require('fs');

const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY, 'utf8');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const csrfToken = req.headers["x-csrf-token"];

        if(!token) {
            return res.status(401).send({ message: "No token provided!" });
        }

        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

        if(decoded.csrfToken !== csrfToken) {
            return res.status(403).send({ message: "Invalid CSRF token!" });
        }

        req.userId = decoded;
        next();
    } catch (err) {
        return res.status(400).send({ message: "Invalid token!" });
    }
}

module.exports = verifyToken;