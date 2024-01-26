const jwt=require("jsonwebtoken")
const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        if(token)
        {
            const decode=jwt.verify(token,"mern")
            console.log(decode)
            req.body._id=decode?.id;
        }
        next();
    }catch(e){console.log(e)}
}
module.exports=authMiddleware;