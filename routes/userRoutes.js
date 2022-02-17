const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
const dotenv = require('dotenv');
const User = require('../Models/User');
const mongoose = require("mongoose");
dotenv.config()
router.post("/register", async(req, res) => {
    const { username, email, password } = req.body;
    const hashedPassowrd = CryptoJS.AES.encrypt(password, process.env.SEC_KEY_CJS).toString();

    try {
        const newUser = new User({ username, email, password: hashedPassowrd })
        let user = await newUser.save()
        res.status(201).json({ username: user.username, email: user.email })
    } catch (error) {
        res.status(500).json('something went wrong')
        return
    }
});




// Decrypt
// var bytes = CryptoJS.AES.decrypt(hashedPassowrd, process.env.SEC_KEY_CJS);
// var originalText = bytes.toString(CryptoJS.enc.Utf8);
module.exports = router;