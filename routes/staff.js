const express = require("express");
const router_1 = express.Router();
const bodyParser = require("body-parser");
const office = require("../models/Office");
const candidates = require("../models/candidate");

router_1.get("/home",(req,res,next)=>{
    res.render("./public/Home.html")
});

router_1.get("/register",(req,res,next)=>{
    res.render("./public/people_registration.html")
});

router_1.get("/result", async (req,res,next)=>{

    var App = require('./con_02')
    result_dis = await App.result()
    console.log(result_dis)
    msg = "election won by " + result_dis[0] + " by " + result_dis[1]+" votes"
    candidates.find((err,data)=>{
        if(!err){
            var i;
            first_name = [];
            last_name = [];
            can_id = [];
            app_ =[];
            for(i =0;i < data.length;i++ )
            {
                first_name[i] = data[i].first_name;
                last_name[i] = data[i].last_name;
                can_id[i] = data[i]._id;
                app_[i] = data[i]._approval;
            }
            res.render("./public/office_candidate_approval",{first_name,last_name,can_id,app_,result:msg})
        }
    });

});

router_1.get("/approve",(req,res,next)=>{
    candidates.findByIdAndUpdate(req.query._id,{_approval:true},function(err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);

            var App = require('./con_02')
            App.add_Candidate(req.query._id);

            candidates.find((err,data)=>{
                if(!err){
                    var i;
                    first_name = [];
                    last_name = [];
                    can_id = [];
                    app_ =[];
                    for(i =0;i < data.length;i++ )
                    {
                        first_name[i] = data[i].first_name;
                        last_name[i] = data[i].last_name;
                        can_id[i] = data[i]._id;
                        app_[i] = data[i]._approval;
                    }
                    res.render("./public/office_candidate_approval",{first_name,last_name,can_id,app_,result:""})
                }
            });
        }
    });
});

router_1.post("/login",(req,res,next)=>{
    
    office.findById(req.body._id,(err,data)=>{
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
                        app_ =[];
                        for(i =0;i < data.length;i++ )
                        {
                            first_name[i] = data[i].first_name;
                            last_name[i] = data[i].last_name;
                            can_id[i] = data[i]._id;
                            app_[i] = data[i]._approval;
                        }
                        res.render("./public/office_candidate_approval",{first_name,last_name,can_id,app_,result:""})
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