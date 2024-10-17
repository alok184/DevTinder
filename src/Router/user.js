const express=require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequst = require('../models/connectionRequst');
const { populate } = require('../models/user');
// create Route
const userRoute= express.Router();
const USER_SAFE_DATA="firtsName lastName gender skills age  imageurl";
// Get all the panding connection Request for the LoggedIn user ....... ✈️
userRoute.get('/user/requests/received', userAuth, async(req, res)=>{
    try{
           const isloginuser= req.user;
           console.log("isLoginuser", isloginuser)
        //    find all the data of userRequest
        const userRequestData=await connectionRequst.find({
               touserId:isloginuser._id, // check touser and Loginuser
               status:'Interested'
        }).populate("fromuserId" , USER_SAFE_DATA );
        // or 
        // populate("fromuserId", ["firtsName",  "lastName"])
        res.json({message:"Data Fetch Successfully", data:userRequestData})
    }catch(err){
        res.status(404).send("Error"+err.message)
    }
});


// get all the connection request what ever accepted

userRoute.get('/user/connection/accepted/data', userAuth, async(req, res)=>{
    try{
        const isloginuserid=req.user;
        // alok-elone=>accepted
        // elone-mark=> accepted
        //so here (if find out the id then elon can maybe touserid, fromuserId)
        const findallAcceptedConnection= await connectionRequst.find({
           $or:[
            {touserId:isloginuserid._id , status:'Accepted'},
            {fromuserId:isloginuserid._id, status:'Accepted'}
           ] 
        }).populate('fromuserId', USER_SAFE_DATA).populate('touserId', USER_SAFE_DATA)

        // Here just filter the data (not return the details of Login user 😁)
        const data = findallAcceptedConnection.map((item)=>{
            if(item.fromuserId._id.toString()=== isloginuserid._id){
                return item.touserId
            }
            return item.fromuserId
        })
        res.json({message:'fecth all the connection request data', data});

    }catch(err){
        res.status(404).send("Error"+ err.message)
    }
});









module.exports=userRoute;