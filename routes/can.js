const express = require("express");
const router_1 = express.Router();
const bodyParser = require("body-parser");
const candidate = require("../models/candidate");
const Contact = require("../models/contacts");

router_1.get("/home",(req,res,next)=>{
    res.render("./public/Home.html")
});

router_1.get("/register",(req,res,next)=>{
    res.render("./public/candidate_registration.html")
});

router_1.post("/register",(req,res,next)=>{
    let newContacts = new candidate({
        _id : req.body._id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        _password : req.body._password,
        _approval : false,
    });
    
    newContacts.save((err,contact)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            res.render("./public/candidate_login.html")
        }
    });

});

router_1.post("/login",(req,res,next)=>{
    candidate.findById(req.body._id,(err,data)=>{
        if (err){
            res.render("./public/voting_pannel.html")
        }
        else{
            if(data._password == req.body._password){
                
                if (data._approval == true){
                    res.render("./public/candidate_message.html",{data : "you are approved"})
                    }
                else{
                res.render("./public/candidate_message.html",{data : "you are not approved yet"})
                }
            }
        
        }
    });
});

module.exports = router_1;