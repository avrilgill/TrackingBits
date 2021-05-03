//Libraries
const express = require("express");
const router = express.Router();
const { body, check } = require('express-validator');

//Local imports
const {addProject,addMember} = require("../controller/addProject-controller")


router.post("/addProject",[
   
    check('Authorization',"Please signup or login").exists()
    .notEmpty(),

    check("password").isLength({min:12,max:25})
    .trim().escape(),

    check("name").escape().isLength({max:25})
    .trim()
    .escape(),

    check("desc").escape().isLength({max:200})
    .trim()
    .escape()

],addProject)

router.post("/allProjects",[
   
    check('Authorization',"Please signup or login").exists()
    .notEmpty(),


],addMember)



module.exports = router;