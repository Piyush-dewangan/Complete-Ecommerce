const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({

 email:String,
 cart:Array
});
module.exports=mongoose.model('mycarts',cartSchema);