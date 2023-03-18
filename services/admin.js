const adminusers=require("../adminusers");

const searchAdmin=async(obj)=>{
    console.log("searchAdmin...");
    let arr= await adminusers.find(obj);
    return arr ;
}
module.exports={searchAdmin};