const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const dotenv = require('dotenv');
const User = require('../Models/User');
const jwt = require('jsonwebtoken')
dotenv.config()

//Register
router.post("/register", async(req, res) => {

    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) {
            const encrpytedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_KEY_CJS).toString();
            const newUser = new User({ username: req.body.username, email: req.body.email, password: encrpytedPassword })
            let user = await newUser.save()
            res.status(201).json({ username: user.username, email: user.email })
        } else {
            res.status(409).json('User already exist with this email address')

        }
    } catch (error) {
        res.status(500).json(error)

    }
});

//Login
router.post("/login", async(req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.email.toString() })

        //User does not exist
        if (!findUser) {
            res.status(404).json('User did not found!')
            return
        }
        const hashedPassword = findUser.password

        //Decrypt Password 
        const decryptedPassword = CryptoJS.AES.decrypt(hashedPassword, process.env.SEC_KEY_CJS).toString(CryptoJS.enc.Utf8)

        //Generate Token
        const accessToken = jwt.sign({ id: findUser._id, isAdmin: findUser.isAdmin }, process.env.JWT_SECRET_TOKEN, { expiresIn: '15d' })
            //Send user
        if (decryptedPassword === req.body.password) {
            console.log(accessToken);
            res.status(200).json({ username: findUser.username, email: findUser.email, accessToken })
        } else {
            res.status(401).json('Wrong email or password')
            return
        }

    } catch (error) {
        res.status(500).json(error)
    }
});

//Delete
router.delete('/:id', async(req, res) => {

})

module.exports = router;