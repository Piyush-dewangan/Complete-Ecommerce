const users=require("../users");

const searchUser=async(obj)=>{
    //obj is object which contain search criteria in an object
    console.log("search begin...");
    let data=await users.find(obj);

    return data;
}

const createNewUser= async(obj)=>{
    //this obj contain all information of  new user
    console.log("CreateNewUser....");
    await users.create(obj);

    return;
}

const userUpdate=async(searchObj,setObj)=>{
    console.log("userUpdate....");
    await users.updateOne(searchObj,{$set:setObj});
    return ;
}
module.exports={searchUser,createNewUser,userUpdate};
