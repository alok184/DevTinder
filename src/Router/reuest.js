const express=require('express');
const requestRoute=express.Router();
const {userAuth}=require("../middlewares/auth")
const conectionRequest=require('../models/connectionRequst')
const User=require("../models/user")
// dummy api for connection request
requestRoute.post("/request/send/:status/:touserId",userAuth, async(req, res)=>{
    try{
         // here find the id of user who send the rquest, and send for the rquest by id
         const fromuserId =req.user._id;
         const touserId=req.params.touserId;
         const status=req.params.status;
         console.log("here id", touserId, fromuserId, status);
         const isAllowedStatus=['Interested', 'Ignored'];
         if(!isAllowedStatus.includes(status)){
            return res.status(404).send("status is  invalid")
         }
         // find the user
         const touser=await User.findById(touserId)
         if(!touser){
            return res.status(404).json({message:"user not found"})
         }
         
         const existingConnectionRequest=await conectionRequest.findOne({
           $or:[
            {fromuserId, touserId},
            {fromuserId:touserId, touserId:fromuserId}

           ],
           });
         if(existingConnectionRequest){
            return res.status(404).send("this rquest is already exist")
         };
         
         const connectionReqData= new conectionRequest({
            touserId,
            fromuserId,
            status
         });
         const data= await connectionReqData.save();
       res.json({
        message:req.user.firtsName  +   " is "  + status +  '   your profile  '   + touser.firtsName ,
        data
       })
    }
    catch(err){
        res.status(404).send("something wents worng")
    }
});
module.exports=requestRoute;