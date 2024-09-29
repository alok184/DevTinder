const express=require('express');
// required database file
const connectdb=  require("./config/database")
const app=express(); 
 const User=require("./models/user")
//  add middleware express to recived the data in json and save to js object
 app.use(express.json());


// create api (singup)✈️ ...
// app.post("/singup", async(req, res)=>{
//     // post the static data in mongodb
//      /// create new instance
//      const user=new User({
//         firtsName:"Mantosh",
//         lastName:"kumar",
//         emailId:"Mantosh@gmail.com",
//         password:"Mantosh123"
//      })
//     //    nest way to handle the error 
//     try{
//         await user.save()
//         res.send("Singup has been done Successfully")
//     }
//     catch(err){
//         res.status(401).send("something wents worng", + err)
//     }
// })

// make the api dyamics
app.post("/singup", async(req, res)=>{
    // post the static data in mongodb
     /// create new instance
     const user=new User(req.body)
     console.log(req.body);
    //    nest way to handle the error 
    try{
        await user.save()
        res.send("Singup has been done Successfully")
    }
    catch(err){
        res.status(401).send("something wents worng", + err)
    }
});

// get the data by emailid
 app.get("/user", async(req, res)=>{
    const userEmail=req.body.emailId;
    console.log(userEmail);
    try{
      const users= await User.findOne({emailId:userEmail})
      if(users===0){
        res.status(404).send("Data no founnd ")
      } else{
        res.send(users)
      }
    }
    catch(err){
        req.status(401).send("something went worng")
    }
 });
// feed api (get all the user from database--✈️✈️)
app.get("/getallUserData", async(req, res)=>{
    try{
  
     const getData= await User.find({})
     if(getData===0){
        res.status(404).send("Data not found")
     }else{
        res.send(getData)
     }
    
    }
    catch(err){
        res.status(401).send("something went wrong")
    }
});
// delete user 








connectdb()
.then(()=>{
    console.log("Database connected successfully ✈️ .....");
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777");
    })

}).catch(err=>{
    console.log("Database is not  connected 🤔 ....");
});
