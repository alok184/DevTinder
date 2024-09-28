const express=require('express');
// required database file
const connectdb=  require("./config/database")
const app=express(); 
 const User=require("./models/user")
// create api (singup)✈️ ...
app.post("/singup", async(req, res)=>{
    // post the static data in mongodb
     /// create new instance
     const user=new User({
        firtsName:"Mantosh",
        lastName:"kumar",
        emailId:"Mantosh@gmail.com",
        password:"Mantosh123"
     })
    //    nest way to handle the error 
    try{
        await user.save()
        res.send("Singup has been done Successfully")
    }
    catch(err){
        res.status(401).send("something wents worng", + err)
    }
})

connectdb()
.then(()=>{
    console.log("Database connected successfully ✈️ .....");
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777");
    })

}).catch(err=>{
    console.log("Database is not  connected 🤔 ....");
});
