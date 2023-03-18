const express=require('express');
const router=express.Router();

const {getcart,getmycart,getcartdelete,getaddcart,getremovecart,getcheckbox,getcheckout,getplaceorder}=require('../controllers/cart');

const {checklogin}=require('../middleware/checklogin')


router.route("/cart/:id").get(checklogin,getcart);

router.route("/mycart").get(checklogin,getmycart);

router.route("/cartdelete/:id").get(checklogin,getcartdelete);

router.route("/addcart/:requiredId").get(checklogin,getaddcart);

router.route("/removecart/:requiredId").get(checklogin,getremovecart);

router.route("/checkbox/:pid/:cbv").get(checklogin,getcheckbox);

router.route("/checkout").get(checklogin,getcheckout);

router.route('/placeorder').get(checklogin,getplaceorder);

module.exports=router;