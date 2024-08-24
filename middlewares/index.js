// const authJwt = require("./authJwt");
// const verifyRegister = require("./verifyRegister");
const upload = require("./multer");
const verifyRegister = require("./verifyRegister");
const authjwt = require("./authjwt");

module.exports = {
    authjwt,
    verifyRegister,
    upload
};