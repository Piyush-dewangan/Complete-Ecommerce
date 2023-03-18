const mycart=require("../mycart");


const createNewCart=async (obj)=>{
  console.log("createNewCart....");
  await mycart.create(obj);
  return;
}
const searchUserCart=async(obj)=>{
    console.log("searchUserCart....");
    let userCart=await mycart.find(obj);
    return userCart;
}

const updateCartarray=async(searchObj,setObj)=>{
    console.log("updateCartarray....");
    let result=await mycart.updateOne(searchObj,{$set:setObj});
    return;
}
module.exports={createNewCart,searchUserCart,updateCartarray};