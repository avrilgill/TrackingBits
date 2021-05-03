//Libraries
const express = require("express");
const router = express.Router();
const { body, check } = require('express-validator');

//Local imports
const {signupController,  loginController} = require("../controller/signup-controller")


router.post("/signup",[
    check("email").isEmail()
    .escape()
    .isLength({max:70})
    .normalizeEmail()
    .notEmpty()
    .not()
    .contains([",","`"," ","'",'"',"<"
    ,">","#","&","(",")",";"]),
    
    check("password").isLength({min:12,max:25})
    .trim().escape(),

    check("name").escape()
    .trim()
    .escape()

],signupController)


router.post("/login",
[
    check('email',"Please check your email format").isEmail()
    .isLength({max:70})
    .escape()
    .normalizeEmail()
    .notEmpty()
    .not()
    .contains([",","`"," ","'",'"',"<"
    ,">","#","&","(",")",";"]),

    check('password').isLength({
        min:12,
        max:25
    }).trim().escape()
],
loginController)

module.exports = router;