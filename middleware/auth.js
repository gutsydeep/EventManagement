const jwt=require("jsonwebtoken");
const secretkey='eventmgmtK';

const verifyToken = async(req,res,next)=>{
   
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        res.status(200).send({success:false,msg:"A token is required for authentication"});
    }
    try {
       const decode= jwt.verify(token,secretkey);
       req.user=decode;
    } catch (error) {
        res.status(400).send("Invalid token");
    }
    return next();
}
module.exports = verifyToken;