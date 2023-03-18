const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({

    id:Number,
    name:String,
    image:String,
    price:Number,
    details: String,
    qty:Number

});
module.exports=mongoose.model('products',productSchema);