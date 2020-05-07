const express = require("express");
const router_1 = express.Router();
const bodyParser = require("body-parser");
const People = require("../models/peronal_detail");
const candidates = require("../models/candidate");

router_1.get("/home",(req,res,next)=>{
    res.render("./public/Home.html")
});

router_1.get("/register",(req,res,next)=>{
    res.render("./public/people_registration.html")
});

router_1.post("/voted",(req,res,next)=>{
    var data = req.body._id;
    data = data.split(",")
    console.log(data[0]+" "+data[1])
    var App = require('./con_02');
    App.vote_can(data[0],data[1]);
    res.render("./public/Home.html");
});

router_1.post("/register",(req,res,next)=>{
    let newContacts = new People({
        _id : req.body._id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        _password : req.body._password,
    });
    
    newContacts.save((err,contact)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            res.render("./public/people_login.html")

            var App = require('./con_02');
            App.add_Voter(req.body._id);

        }
    });

});

router_1.post("/login",(req,res,next)=>{
    People.findById(req.body._id,(err,data)=>{
        if (err){
            res.render("./public/voting_pannel.html")
        }
        else{
            if(data._password == req.body._password){
                candidates.find((err,data)=>{
                    if(!err){
                        var i;
                        first_name = [];
                        last_name = [];
                        can_id = [];
                        for(i =0;i < data.length;i++ )
                        {
                            if (data[i]._approval) {
                            first_name[i] = data[i].first_name;
                            last_name[i] = data[i].last_name;
                            can_id[i] = data[i]._id;
                            }
                        }
                        res.render("./public/voting_pannel.html",{first_name,last_name,can_id,sender_id:req.body._id})
                    }
                }); 
            }
            else{
                res.render("./public/people_login.html")
            }
        }
    });
});

module.exports = router_1;