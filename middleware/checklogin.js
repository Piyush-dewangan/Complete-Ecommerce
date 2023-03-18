
const checklogin=(req,resp,next)=>{
    if(req.session.checkLogin){
        next();
    }else{
        resp.redirect('/');
    }

}
module.exports={checklogin};