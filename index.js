// importing modules   "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="D:\Files\MongoDB\DATA\db"

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

var app = express();

const route = require("./routes/route");
const people = require("./routes/peoples");
const home = require("./routes/home");
const candidate = require("./routes/can");
const staff = require("./routes/staff");

//connect to mongooseDB
mongoose.connect('mongodb://localhost:27017/contactlist',{useNewUrlParser: true});

//on connection with mongoose 
mongoose.connection.on("connected",()=>{
    console.log("connected to data base at port 27017");
});

mongoose.connection.on("error",(err)=>{
    if (err){
        console.log("error data connection " + err);
    }
});


//port no
const port = 3000;

//adding middle wear - cors
app.use(cors());

//body parser
//app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

// add routes
app.use("/api",route);
app.use("/peoples",people);
app.use("/home",home);
app.use("/can",candidate);
app.use("/office",staff);

//testing server
app.get("/home",(req,res)=>{
    res.render("./public/index.html",{name:["ayush","karl"],name_2:"string"});
})

app.listen(port,()=>{
    console.log("server started at port "+ port);
})

var App = require('./routes/con_02')
App.dep()
