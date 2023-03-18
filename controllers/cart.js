const users=require("../users");
const products=require("../products");
const adminusers=require("../adminusers");
const mycart=require("../mycart");

const {productCount,getAllproducts,getRangeProducts, searchProducts}=require('../services/products');
const {searchUser,createNewUser,userUpdate}=require('../services/users');

const {createNewCart,searchUserCart,updateCartarray}=require('../services/cart');

const getcart=async(req,resp)=>{
    const { id } = req.params;
    console.log(req.params);
    console.log(typeof id);
    //getting product id to put it in mycart.txt
    const pid = parseInt(id);

    // req.session.email="dewanganpiyush9@gmail.com";

    //let pdata= await products.find({id:pid});
    // let userCart=await mycart.find({email:req.session.email});
    let userCart=await searchUserCart({email:req.session.email});
    let pdata=await searchProducts({id:pid});

    let cartArray=userCart[0].cart;
   let check =checkCart(pid,cartArray);
   console.log("check value :",check); 
    if(check==false){
        let obj=pdata[0].toObject();
        obj.quantity=1; 
        obj.checkbox=false;
        console.log("object is :",obj);
        cartArray.push(obj);
        // let result=await mycart.updateOne({email:req.session.email},{$set:{cart:cartArray}});
        await updateCartarray({email:req.session.email},{cart:cartArray});
        // console.log(result);
    }
    else{
        console.log("Inside else condition");
        let len=cartArray.length;
        
        for(let i=0;i<len;i++){
            if(pid==cartArray[i].id){
               console.log("inside if conditon ");
               cartArray[i].quantity++;
               console.log(cartArray[i]);
               console.log(cartArray[i].quantity);
               break;
            }
        }
        // let result=await mycart.updateOne({email:req.session.email},{$set:{cart:cartArray}});
        await updateCartarray({email:req.session.email},{cart:cartArray});

        // console.log(result);
    }
    resp.redirect('/');
    // resp.send("all good");

}
function checkCart(pid,arr)
{
    let len=arr.length;

    for(let i=0;i<len;i++){
        if(pid==arr[i].id){
            return true;
        }
    }
    return false;
}
const getmycart=async(req,resp)=>{
    let user = req.session.name;
    // req.session.email="dewanganpiyush9@gmail.com";
    //   let cartObj= await mycart.find({email:req.session.email});
      let cartObj=await searchUserCart({email:req.session.email});
      let pd=cartObj[0].cart;
  
      resp.render("cart/cart.ejs", { user: user,pd:pd });
}

const getcartdelete=async(req,resp)=>{
      //id is string
   const {id}=req.params;
   const deleteId=parseInt(id);
   //req.session.email="dewanganpiyush9@gmail.com"
    let cartObj= await searchUserCart({email:req.session.email});
    let cartArr=cartObj[0].cart;
     console.log("cart array :",cartArr);

     let len=cartArr.length;
     console.log("length before slice is :",cartArr.length);
     for(let i=0;i<len;i++){
        let obj=cartArr[i];
       // console.log("this is id",obj.id);
        if(deleteId==obj.id){
            cartArr.splice(i,1);
            break;}
     }
     console.log("length after slice is :",cartArr.length);
    //  let result=await mycart.updateOne({email:req.session.email},{$set:{cart:cartArr}});
     await updateCartarray({email:req.session.email},{cart:cartArr});
     resp.send("all well");

}
const getaddcart= async (req,resp)=>{
    const {requiredId}=req.params;
    const id=parseInt(requiredId);
    console.log("this is the",id);
    console.log("this is type",typeof id);
   // req.session.email="dewanganpiyush9@gmail.com"
    // let objCart=await mycart.find({email:req.session.email});
    let objCart=await searchUserCart({email:req.session.email});
    let cartArr=objCart[0].cart;
 
    let len=cartArr.length;
     // console.log("this is array :",cartArr);
     for(let i=0;i<len;i++){
         if(id==cartArr[i].id)
         {
             console.log("value of quantity",cartArr[i].quantity);
             cartArr[i].quantity++;
             console.log("value of quantity",cartArr[i].quantity);
             break;
         }
     }
    //  let result=await mycart.updateOne({email:req.session.email},{$set:{cart:cartArr}});
    console.log("this is that");
    await updateCartarray({email:req.session.email},{cart:cartArr});
     resp.send("all well");
}

const getremovecart=async(req,resp)=>{
    const {requiredId}=req.params;
    const id=parseInt(requiredId);
    console.log("this is the",id);
    console.log("this is type",typeof id);
    // req.session.email="dewanganpiyush9@gmail.com"
    //let objCart=await mycart.find({email:req.session.email});
    let objCart=await searchUserCart({email:req.session.email});
    let cartArr=objCart[0].cart;
 
    let len=cartArr.length;
     // console.log("this is array :",cartArr);
     for(let i=0;i<len;i++){
         if(id==cartArr[i].id)
         {
             console.log("value of quantity",cartArr[i].quantity);
             cartArr[i].quantity--;
             console.log("value of quantity",cartArr[i].quantity);
             break;
         }
     }
    //  let result=await mycart.updateOne({email:req.session.email},{$set:{cart:cartArr}});
     await updateCartarray({email:req.session.email},{cart:cartArr});
     resp.send("all well");
}

const getcheckbox= async(req,resp)=>{
    let pid=parseInt(req.params.pid);
    let cbv=(req.params.cbv === 'true');
    console.log(cbv);
    console.log("this is pid",typeof pid);
    console.log("this is cbv",typeof cbv);
    // req.session.email="dewanganpiyush9@gmail.com";
    console.log(req.session.email);
    // let objCart=await mycart.find({email:req.session.email});
    let objCart=await searchUserCart({email:req.session.email});
    let objArr=objCart[0].cart;
    console.log("value of cbv ",cbv);
    
    console.log("inside");
    let len=objArr.length;
    for(let i=0;i<len;i++){
        let id=objArr[i].id;
        if(id==pid){
            objArr[i].checkbox=cbv;
            // console.log("value :",objArr[i].checkbox);
        }
    }
    // let result=await mycart.updateOne({email:req.session.email},{$set:{cart:objArr}});
    // console.log("value of result is :",result);   

    await updateCartarray({email:req.session.email},{cart:objArr});

    resp.send("this works")
}

const getcheckout=async(req,resp)=>{
    // resp.send("all is well");
   // req.session.email="dewanganpiyush9@gmail.com";
   console.log("checkout runs>>");
   //let objCart=await mycart.find({email:req.session.email});
   let objCart=await searchUserCart({email:req.session.email});
   let cartArr=objCart[0].cart;
   let pd=cartArr;
   let len=pd.length;
   let totalPrice=0;
   for(let i=0;i<len;i++){
       let obj=cartArr[i];
       if(obj.checkbox){
           totalPrice=totalPrice+obj.price*obj.quantity;
       }
   }
   //resp.send(pd);
   resp.render('checkout/index.ejs',{pd:pd,lm:pd.length,tp:totalPrice});
}
const getplaceorder=async(req,resp)=>{
    console.log("placeorder>>");
   // let objCart=await mycart.find({email:req.session.email});
   let objCart=await searchUserCart({email:req.session.email});
    let cartArr=objCart[0].cart;
    let len=cartArr.length;
    console.log(cartArr);
    for(let i=0;i<cartArr.length;i++){
        let obj=cartArr[i];
        console.log(obj.checkbox);
        if(obj.checkbox){
            cartArr.splice(i,1);
            i--;
        }
    }

    // let result=await mycart.updateOne({email:req.session.email},{$set:{cart:cartArr}});
    // console.log(result);
    await updateCartarray({email:req.session.email},{cart:cartArr});
    resp.redirect('/mycart');
}
module.exports={getcart,getmycart,getcartdelete,getaddcart,getremovecart,getcheckbox,getcheckout,getplaceorder};