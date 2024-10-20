const express=require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequst = require('../models/connectionRequst');
const { populate } = require('../models/user');

const User=require('../models/user')

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

// feed Api 

userRoute.get('/user/feed', userAuth, async(req, res)=>{
    try{
        // find Login user
        const loginuser=req.user;
        // Pagination
        // feed?page=1&limit=10  this one query parms amd here pass the number in string so conver into int use parseInt
        const page= parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        // limit>50 : return 50 else return limite
        limit=limit>50 ? 50 : limit;
        // formula of skip
        const skipData=(page-1)*limit;
        // find all the connection request (send + recived)
        const findAllconnectionRequest= await connectionRequst.find({
            $or:[
                {fromuserId:loginuser._id},
                {touserId:loginuser._id}
            ]
        }).select("fromuserId touserId ")

        //  hinde user from feed those are in connection
        const hideUserFeed= new Set()  // new set means  data in array will be unique
        findAllconnectionRequest.forEach((req)=>{
            hideUserFeed.add(req.fromuserId.toString())  // tostring i have bcz id in string
            hideUserFeed.add(req.touserId.toString())
        })
        console.log("add the coonection id which should hide ", hideUserFeed);
        // find all the feed the data
        // hinddenuserData and slef data should not show to login user
        const findfeeddatafromusermodels= await User.find({
            $and:[
                {_id: {$nin:Array.from(hideUserFeed)}},  // nin means not present in array
                {_id: {$ne:loginuser._id}}    // ne means not present 
            ]
        }).select(USER_SAFE_DATA).skip(skipData) .limit(limit);
        console.log("find feed data", findfeeddatafromusermodels);


     
        res.json({data:findfeeddatafromusermodels})
    }catch(err){
        res.status(400).json({message: "Error:"+ err.message})
    }
})









module.exports=userRoute;