const express = require("express");
const router = express.Router();

const Contact = require("../models/contacts");

//retreving data
router.get("/contacts",(req,res,next)=>{
    Contact.find(function(err,contacts){
        res.json(contacts);
    })
});

//add contacts
router.post("/contacts",(req,res,next)=>{
    let newContacts = new Contact({
        _id : req.body._id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone,
    });
    
    newContacts.save((err,contact)=>{
        if(err){
            res.json({msg:"failed to add contact " + err})
        }
        else{
            res.json({msg:" add contact successfuly and your _id "+newContacts._id})
        }
    });
});

//deleting th data 
router.delete("/contacts/:id",(req,res,next)=>{
    console.log(req.params.id)
    Contact.remove({_id : req.params.id},function(err,result){
        if (err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});

//updating the data
router.put("/contacts",(req,res)=>{
    Contact.update()
});

module.exports = router;