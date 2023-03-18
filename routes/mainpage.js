const express=require('express');
const router=express.Router();

const {getloadmore,getlogout,getreset,postreset}=require('../controllers/mainpage');

router.route('/loadmore/:page').get(getloadmore);

router.route("/logout").get(getlogout);

router.route("/reset").get(getreset).post(postreset);
module.exports=router;