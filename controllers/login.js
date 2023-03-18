const users=require("../users");
const products=require("../products");
const adminusers=require("../adminusers");
const mycart=require("../mycart");

const sendEmail = require("../methods/sendEmail");
const verifyforgot = require("../methods/verifyforgot");

const {productCount,getAllproducts}=require('../services/products');
const {searchUser,createNewUser,userUpdate}=require('../services/users');

const {createNewCart}=require('../services/cart');


const logintasks= async(req,resp)=>{
    if (req.session.checkLogin && req.session.emailVerified) {
        let user = req.session.name;
        req.session.lm= req.session.page*5;
        console.log(req.session.page);
        let lm = req.session.lm;
        // console.log();
       // let size=await products.count();
        let size=await productCount();
        console.log("value of size =",size);
        
        if(lm>size){
            lm=size;
        }
        
        //let pd=await products.find().limit(lm);
        let pd= await getAllproducts(lm);
        // console.log("products :",pd);
        resp.render("mainpage/mainpage.ejs", { user: user, pd: pd, lm: lm })//,{pd});   
    }
    else if (req.session.checkLogin) {
        console.log("line 28");
        let check = false;
        let ev = !(req.session.emailVerified);
        resp.render("home/index.ejs", { check: check, ev: ev });
        return
    }
    else {
        let check = false;
        let ev = false;
        resp.render("home/index.ejs", { check: check, ev: ev });
    }
}
const getlogin=async(req,resp)=>{
    resp.redirect("/");
}

const postlogin= async(req,resp)=>{
    console.log("postlogin >>");
    let formObj = req.body;
    let present = false;
    let crObj={email:formObj.email,password:formObj.password};
    // let data=await users.find(crObj);
    let data=await searchUser(crObj);
    console.log(data);
    console.log(data[0]);
    if(data.length!=0){
        present = true;
        req.session.page=1;
        req.session.checkLogin = true;
        req.session.lm = 5;
        req.session.name = data[0].username;
        req.session.email = data[0].email;
        req.session.emailVerified = data[0].ev;
    }
    
    if (present) {
        console.log("this line is work");
        resp.redirect('/');
    }
    else {
        //this statments handle when password is not match
        console.log("worng password");
        let check = true;
        let ev = !(req.session.emailVerified);
        resp.render("home/index.ejs", { check: check, ev: ev });
    }
}

const getnewccount= (req,resp)=>{
    let check = false;
    resp.render("newAccount/index.ejs", { check });
}

const createAccount=async (req,resp)=>{
    let formObj = req.body;
    let crObj={email:formObj.email};
    let emailData=await searchUser(crObj);
    crObj={phone:formObj.phone}
    let phoneData=await searchUser(crObj);
    if(emailData.length==0 && phoneData.length==0 ){
        formObj.ev = false;
        formObj.mailToken = Date.now();
        // await users.create(formObj);
        await createNewUser(formObj);
        await createNewCart({email:formObj.email,cart:[]});
        // await mycart.create();
        sendEmail(formObj, function (err, data) {
            resp.redirect('/');
        });
        
    }
    else{
        console.log("this line run");
        let check = true;
        resp.render("newAccount/index.ejs", { check });
    }
}


 const verifyemail= async (req,resp)=>{
    const { token } = req.params;
    console.log(req.params);
    const ntoken = parseInt(token);
    // let result= await users.updateOne({mailToken:ntoken},{$set:{ev:true}});
    userUpdate({mailToken:ntoken},{ev:true});
    // console.log(result);
    // resp.send("all good>>");
    resp.redirect('/');
 }

const getforgot=(req,resp)=>{
    if (req.session.checkLogin) {
        resp.redirect("*");
    }
    else {
        resp.render("forgot/index.ejs", { err: "" });
    }
}
const getverifyforgot=async(req,resp)=>{
    const { token } = req.params;
    console.log(req.params);
    const ntoken = parseInt(token);

    // let userdata= await users.find({mailToken:ntoken});
    let userdata=await searchUser({mailToken:ntoken});
    req.session.email=userdata[0].email;
    console.log("this is email", req.session.email);
    if(userdata.length!=0){
        req.session.checkLogin = true;
        req.session.emailVerified = true;
        req.session.lm = 5;
       // resp.send("in if condition");
        resp.redirect('/reset');
        return;
    }
    else{
       // resp.send("in else condition");
         resp.render("forgot/index.ejs", { err: "Invalid Token not exist" });
    }
}

const postforget=async(req,resp)=>{
    let formObj = req.body;
    let email = formObj.email;

    // let userdata=await users.find({email:formObj.email});
    let userdata=await searchUser({email:formObj.email});
    if(userdata.length!=0){
        formObj.mailToken=userdata[0].mailToken;
        verifyforgot(formObj, function (err, data) {
           resp.redirect('/');
        //    resp.send("verify if condition")
        });
    }
    else{
        resp.render("forgot/index.ejs", { err: "Email id is not register" });
        // resp.send("verify else condition");
    }
}

module.exports={logintasks,getlogin,postlogin,getnewccount,createAccount,verifyemail,getforgot,getverifyforgot,postforget};