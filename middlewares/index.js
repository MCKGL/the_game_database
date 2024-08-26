// const authJwt = require("./authJwt");
// const verifyRegister = require("./verifyRegister");
const upload = require("./multer");
const verifyRegister = require("./verifyRegister");
const auth = require("./auth");

module.exports = {
    auth,
    verifyRegister,
    upload
};