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

// api (connection request review (accepted or rejected))
requestRoute.post('/request/review/:status/:requestId', userAuth, async(req, res)=>{
   try{
      const isloginuser=req.user;
      //extract the parms
      const{status, requestId}=req.params;
      // validate the status ::
      const isAllowedStatus=['Accepted', 'Rejected'];
      if(!isAllowedStatus.includes(status)){
         return res.status(404).json({message:"Status in not valid try agin . !!"})
      };
      const check_status_parsent_id= await conectionRequest.findOne({
         _id:requestId,
         touserId:isloginuser._id,
         status:'Interested'
      });
      if(!check_status_parsent_id){
         return res.status(404).send("connection request not found . !!")
      }
      check_status_parsent_id.status=status
      const data=check_status_parsent_id.save();
      res.json({message:"Connection request has been done successfully . !", data})

       // request id should be valide 
    // check the  id is present or not like Alok=>Elone
    // loginuser= touserid (true or not ) 
   // status:interested
    // request id should be valide 

   }catch(err){
      res.send("Error" + err.message)
   }
})


module.exports=requestRoute;