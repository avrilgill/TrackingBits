const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const e = require("express");
const { body, check, validationResult } = require('express-validator');
const saltRounds = 12;
const jsonKey = "NotoriousBits"
const checkauth = async (req, res, next) => {


    if (req.method === "OPTIONS") {
        next();
    }
    if (!req.headers.authorization) {

        return res.json({ message: "Login or signup needed" })
    } else {
        try {

            const token = req.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, jsonKey);
            const { uid, email } = payload;
            req.uid = uid;
            req.email = email;
            next();
        } catch (error) {
            next(Error(error))
        }
    }


}

module.exports = checkauth