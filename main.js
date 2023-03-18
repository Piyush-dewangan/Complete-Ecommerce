require("./config");
const users=require("./users");
const products=require("./products");
const adminusers=require("./adminusers");
const mycart=require("./mycart");
// const mycarts;
const { json } = require('body-parser');
const express = require('express')
const session = require('express-session');
// const flash = require('connect-flash')
const app = express();
const port = 5000;
const fs = require('fs');
const sendEmail = require("./methods/sendEmail");
const verifyforgot = require("./methods/verifyforgot");
const { updateOne, deleteOne, find } = require("./users");
app.set('view engine', 'ejs');
//middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
const multer = require('multer');

app.use(express.static('uploads'));
const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads"); 
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now()+".jpg")
        }

    })
}).single("user_file");

const login_routes=require('./routes/login');
app.use(login_routes);

const mainpage_routes=require('./routes/mainpage');
app.use(mainpage_routes);

const cart_routes=require('./routes/cart');
app.use(cart_routes);

const admin_routes=require("./routes/admin");
app.use(admin_routes);
// app.use('/login',login_routes);
app.post('/upload',upload,async (req,resp)=>{
    let obj=req.body;
    console.log(req.body);
    console.log(req.file);
    
   let result=await products.create({id:parseInt(Date.now()),qty:parseInt(obj.pq),price:parseInt(obj.pp),details:obj.pd ,name:obj.pn,image:req.file.filename});

   // resp.send("The send works");
   resp.redirect('/addnewproduct');
})

app.get("/productData",async function (req, resp) {

    let data=await products.find();
    resp.send(JSON.stringify(data));

});

app.get("/styles.css", function (req, resp) {
    resp.sendFile(__dirname + "/public/home/styles.css");
    return;
})
app.get("/logo.png", function (req, resp) {
    resp.sendFile(__dirname + "/public/home/logo.png");
    return;
})


app.get("*", function (req, resp) {
    // resp.sendFile(__dirname + "/public/Invalid/index.html")
    resp.render("invalid/index.ejs");
})
app.listen(port, function () {
    console.log("port :", port, "is running");
});