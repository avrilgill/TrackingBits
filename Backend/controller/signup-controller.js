//Library imports
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//Local imports
const getDb = require("../database/database").getDb;



const saltRounds = 12;
const jsonKey = "NotoriousBits"
const signupController = async (req,res,next)=>{
    const errors = validationResult(req);
   
    
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {name,email,password} = req.body; 
    const db = getDb();
    try{
        const result = await db.collection("Users").findOne({"email":email})
        if (result){
            res.status(401).send({ message: "User already exists, try another email" })
        }else{
            const hash = bcrypt.hashSync(password, saltRounds);
                        
            const newUser = {
                name,
                email,
                password: hash,
            }
            const userInsertResult = await db.collection("Users").insertOne(newUser);
            const token = jwt.sign({uid:userInsertResult.ops[0]._id, email }, jsonKey, { expiresIn: '1h' })
            res.status(200).send({ message: "User created", token })
        }
    }catch (error) {
        next(new Error(error))  
    }
}



const loginController = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }
    const { email, password } = req.body;
    
    const db = getDb();
    try{
        const foundUser = await db.collection("Users").findOne({email:email}) 
        // console.log(foundUser)
        if (foundUser) {
            const isValid = bcrypt.compareSync(password, foundUser.password);
            if (isValid) {
                const token = jwt.sign({ uid: foundUser._id, email }, jsonKey, { expiresIn: '1h' })
                return res.status(200).send({ message: "Valid User", token })
            } else {
                return res.status(500).send({ message: "Something went wrong, Please check your credentials" })
            }
        }
        else {
            return res.status(401).send({ message: "User not found, Maybe consider signup?" })
        }
    }catch(error){
        next(new Error(error))
    }
   

}


exports.signupController = signupController;
exports.loginController = loginController;