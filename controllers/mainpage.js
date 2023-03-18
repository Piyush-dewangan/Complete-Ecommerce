const users=require("../users");
const products=require("../products");
const adminusers=require("../adminusers");
const mycart=require("../mycart");

const {productCount,getAllproducts,getRangeProducts}=require('../services/products');
const {searchUser,createNewUser,userUpdate}=require('../services/users');

const {createNewCart,searchUserCart}=require('../services/cart');


const getloadmore= async(req,resp)=>{
    console.log("loadmore request runs");
    req.session.page=req.session.page+1;
    //  let size=await products.count();
    let size=await productCount();
     let maxpageneed= Math.ceil(size/5);
     console.log("maximum page will be",maxpageneed);
     if (req.session.page <= maxpageneed){
         
         let pno=req.session.page;
         let skipNo=(pno-1)*5;
        let pd=await getRangeProducts(skipNo,5);
         resp.send(JSON.stringify(pd));
         return;
     }
     else{
         req.session.page=maxpageneed;
         resp.send();
     }
}
const getlogout=(req,resp)=>{
    req.session.destroy();
    // resp.redirect("/");
    let check = false;
    let ev = false;
    // resp.render("home/index.ejs", { check: check, ev: ev });
    resp.redirect('/');
}

const getreset=(req,resp)=>{
    resp.render("Reset/index.ejs", { err: "" });
    // resp.render("newAccount/index.ejs",{check});

}
const postreset= async (req,resp)=>{
    
    if (req.session.checkLogin && req.session.emailVerified) {
        let formObj = req.body;
        console.log("form obj:", formObj);
        if (formObj.cp != formObj.np) {
            console.log("if case");
            resp.render("Reset/index.ejs", { err: "Invalid enter same password" });
            return;
        }
        else {
            //if password is same then>> change it form db
            console.log("reading start");
            console.log(req.session.email);
            // let result= await users.updateOne({email:req.session.email},{$set:{password :formObj.np}});
            await userUpdate({email:req.session.email},{password :formObj.np});
          //  resp.send("password changed");
          resp.redirect("/");
           
        }
    }
    else {
      //  resp.send("welll till else")
       resp.redirect("*")
        return;
    }
}

module.exports={getloadmore,getlogout,getreset,postreset};