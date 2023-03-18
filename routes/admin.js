const express=require('express');
const router=express.Router();

const {getloginadmin,getupdateproduct,getdelete,getaddnewproduct,getcheckadminlogin,postcheckadminlogin}=require('../controllers/admin');
router.route("/loginadmin").get(getloginadmin);

router.route("/updateproduct").post(getupdateproduct);

router.route('/deleteP/:id').get(getdelete);

router.route('/addnewproduct').get(getaddnewproduct);

router.route('/checkadminlogin').get(getcheckadminlogin);

router.route('/checkadminlogin').post(postcheckadminlogin);
module.exports=router;