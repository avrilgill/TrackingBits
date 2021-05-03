//Library imports
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//Local imports
const getDb = require("../database/database").getDb;
const {roles} = require("../common/projectVariables");

const saltRounds = 12;


async function checkForMember(email,projid,uid){
    const result = await db.collection("Projects").findOne({"email":email,"_id":projid,"roles":{ $elemMatch: { userid: uid, email: email}}})
            if (result){
                return true;
            }
            
                return false;
            
}
const addProject = async (req,res,next)=>{
    const errors = validationResult(req);
   
    
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {name,desc,password} = req.body; 
    const db = getDb();
    try{
        if(req.email && req.uid){
        
            const createdAt = new Date().getTime();
            const db = getDb();
            const hash = bcrypt.hashSync(password, saltRounds);
            const insertResult = await db.collection("Projects").insertOne({
                name,
                creator:req.uid,
                createdAt,
                desc,
                password:hash,
                role:[{userid:req.uid,role:roles[0],email:req.email}]
            })
           
            return res.send({insertCount:insertResult.insertedCount})
        }else{  
            next(new Error("Something went wrong while creating a project"))
        }
    }catch (error) {
        next(new Error(error))  
    }
}

const addMember = async (req,res,next)=>{
    const errors = validationResult(req);
   
    
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {projid,memberEmail} = req.body; 
    const db = getDb();
    try{
        if(req.email && req.uid){
            
            const createdAt = new Date().getTime();
            const db = getDb();
            if(checkForMember(req.email,projid,req.uid)){
                const newMember = await db.collection("Users").findOne({email:memberEmail})
                const insertResult = await db.collection("Projects").updateOne ({
                    creator:req.uid,
                    role: { $elemMatch: { userid: req.uid, email: req.email,role:roles[0]}}
                },{ role: { $push: {userid:newMember.ops[0]._id,role:roles[1],email:memberEmail} }})
                
                return res.send({insertCount:insertResult.insertedCount})
            }
            
        }else{  
            next(new Error("Something went wrong while creating a project"))
        }
    }catch (error) {
        next(new Error(error))  
    }
}

const allProjects = async (req,res,next)=>{
    const errors = validationResult(req);
   
    
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {projid,memberEmail} = req.body; 
    const db = getDb();
    try{
        if(req.email && req.uid){
            
            const createdAt = new Date().getTime();
            const db = getDb();
            const foundUser = await db.collection("Users").findOne({email:email,_id:req.uid}) 
            if (foundUser) {
               
                if (isValid) {
                    
                    return res.status(200).send({ message: "Valid User", token })
                } else {
                    return res.status(500).send({ message: "Something went wrong, Please check your credentials" })
                }
            }
            else {
                return res.status(401).send({ message: "User not found, Maybe consider signup?" })
            }
            
        }else{  
            next(new Error("Something went wrong while creating a project"))
        }
    }catch (error) {
        next(new Error(error))  
    }
}


exports.addProject = addProject;
exports.addMember = addMember;