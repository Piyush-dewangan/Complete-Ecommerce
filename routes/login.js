const express=require('express');
const router=express.Router();

const {logintasks,getlogin,postlogin,getnewccount,createAccount,verifyemail,getforgot,getverifyforgot,postforget}=require('../controllers/login');
const verifyforgot = require('../methods/verifyforgot');
router.route('/').get(logintasks);

router.route('/login').get(getlogin).post(postlogin);

router.route('/newccount').get(getnewccount);

router.route('/createAccount').post(createAccount);

router.route("/verifymail/:token").get(verifyemail);

router.route('/forgot').get(getforgot);

router.route('/forgot').post(postforget);


router.route('/verifyforgot/:token').get(getverifyforgot);
module.exports=router;