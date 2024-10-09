const express=require('express');
const requestRoute=express.Router();
const {userAuth}=require("../middlewares/auth")
// dummy api for connection request
requestRoute.get("/connectedApi",userAuth, async(req, res)=>{
    try{
        const user=req.user;
         console.log("connect ", user.firtsName);
         res.send("connected successfully userName is " + user.firtsName)
    }
    catch(err){
        res.status(404).send("something wents worn")
    }
});
module.exports=requestRoute;