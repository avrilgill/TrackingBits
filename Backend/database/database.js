const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;


let _db;
let _client;

//Enter your mongo client url here
const mongoConnect = callback =>{
    
    MongoClient.connect("mongodb+srv://user:v8E8qcXbeMUFfqXA@cluster0.5vihk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    ,{useUnifiedTopology:true}
    ).then((client)=>{
        _client = client;
        _db = client.db();
        callback();
    }).catch(error=>{
        console.log("Error connecting to mongoDB : Database.js")
    })

}

const getDb = ()=>{

    if(_db){
        return _db;
    }
    else{
        throw "No database found";
    }
}

const getClient = ()=>{
    
    if(_client){
        return _client;
    }else{
        throw "NO database found,Client error"
    }

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.getClient = getClient;
