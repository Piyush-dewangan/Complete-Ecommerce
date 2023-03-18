const products=require("../products");


const productCount=async()=>{
    let size=await products.count();
    console.log("productCount.....",size);
    return size;
}

const getAllproducts=async(lm)=>{
    //this function return 0 to lm products
    //if lm is -1 then it return whole products
    console.log("value of lm",lm);
    if(lm != -1)
    {
        return await products.find().limit(lm);
    }
    else{
        return await products.find();
    }
}
const getRangeProducts=async(sv,lm)=>{
    console.log("getRangeProducts....");
    let pd=await products.find().skip(sv).limit(lm);
    return pd;
}
const searchProducts=async(obj)=>{
    console.log("searchProducts....");
    let pdata= await products.find(obj);
    return pdata;
}

const updateProducts=async(searchObj,setObj)=>{
     console.log("updateProducts....");
     await products.updateOne(searchObj,{$set:setObj});
     return;
}
const deleteProducts=async(obj)=>{
    console.log("deleteProducts....");
    await products.deleteOne(obj);
    return;
}

module.exports={productCount,getAllproducts,getRangeProducts,searchProducts,updateProducts,deleteProducts};