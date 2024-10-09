

const express=require('express')
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")

// profile get the data and validate the token
profileRouter.get("/profile",userAuth,  async(req, res)=>{
    try{
         const user= req.user;
        res.send(user)
       
    }catch(err){
        res.status(404).send("Profile Not found")
    }
 
});
module.exports=profileRouter;