const express = require("express");
const router_2 = express.Router();
const bodyParser = require("body-parser");
const People = require("../models/peronal_detail");

router_2.get("/home",(req,res,next)=>{
    res.render("./public/Home.html")
});

router_2.get("/peoples_login",(req,res,next)=>{
    res.render("./public/people_login.html")
});

router_2.get("/office_login",(req,res,next)=>{
    res.render("./public/office_login.html")
});

router_2.get("/candidate_login",(req,res,next)=>{
    res.render("./public/can_login.html")
});


module.exports = router_2;