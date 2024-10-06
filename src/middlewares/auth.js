  
const jwt=require('jsonwebtoken')
const User= require("../models/user")

const userAuth=async(req, res, next)=>{
    try{
       // extarct the tooken
       const {token}=req.cookies;
       if(!token){
        throw new Error("token is not valid")
       }
       // decode the cookies
       const decodeObj= await jwt.verify(token, "DevTinder@8786991");
        const { _id }=decodeObj;
        // find  out the user::
        const user= await User.findById( _id );
        console.log("here user", user); 
        if(!user){
            throw new Error("User Not found try agin..!!!")
        }
      
        req.user=user;
        next();
         
    }catch(err){
        res.status(404).send("Error:" + err.message)
    }
   
};
module.exports={

    userAuth
}