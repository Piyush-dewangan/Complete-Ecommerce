const users=require("../users");
const products=require("../products");
const adminusers=require("../adminusers");
const mycart=require("../mycart");

const {productCount,getAllproducts,getRangeProducts, searchProducts,updateProducts,deleteProducts}=require('../services/products');
const {searchUser,createNewUser,userUpdate}=require('../services/users');

const {createNewCart,searchUserCart,updateCartarray}=require('../services/cart');

const {searchAdmin}=require('../services/admin');

const getloginadmin=async(req,resp)=>{
    console.log("getloginadmin>>");
    req.session.alm=5;
    // let pd=await products.find();
    let pd=await getAllproducts(-1);
    // resp.send(pd);
    resp.render("admin/admin.ejs",{pd:pd,lm:pd.length});

}
const getupdateproduct=async(req,resp)=>{
    
    console.log("this is body",req.body);
    let obj=req.body;
    //  let result= await products.updateOne({id:obj.id},{$set:{name:obj.pname,details:obj.pdetail,price:obj.pprice,qty:obj.pquantity}})
     await updateProducts({id:obj.id},{name:obj.pname,details:obj.pdetail,price:obj.pprice,qty:obj.pquantity});
    //  console.log(result);
    resp.send("all good");
}

const getdelete= async(req,resp)=>{
    const {id}=req.params;
    let pid=parseInt(id);
    
   // let result= await products.deleteOne({id:pid});
    await deleteProducts({id:pid})
    let res= await mycart.updateMany({},{
        $pull:{
            cart:{
                 id:pid
            }
        }
    })
    console.log("this is res",res);
    // console.log(result);
    resp.send("all good");
}
const getaddnewproduct=(req,resp)=>{
    
    resp.render("addnewproduct/index.ejs");
}
const getcheckadminlogin=(req,resp)=>{
    resp.render('adminloginpage/adminlogin.ejs',{err:""});
}
const postcheckadminlogin= async(req,resp)=>{
    console.log("this is it");

    console.log(req.body);
    // let arr= await adminusers.find({email:req.body.email, password:req.body.password});
    let arr=await searchAdmin({email:req.body.email, password:req.body.password})
    console.log(adminusers);
    if(arr.length!=0){
        resp.redirect('/loginadmin');
    }
    else{
        resp.render('adminloginpage/adminlogin.ejs',{err:"Email and password not match"});
    }
}

module.exports={getloginadmin,getupdateproduct,getdelete,getaddnewproduct,getcheckadminlogin,postcheckadminlogin};