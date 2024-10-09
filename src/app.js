const express=require('express');
// required database file
const connectdb=  require("./config/database");
const app=express(); 
//  add middleware express to recived the data in json and save to js object
 app.use(express.json());
// middleware of cookien
const cookiesParser= require("cookie-parser")
app.use(cookiesParser());

// import the route of api

const authRouter=require('./Router/auth');
const profileRouter=require('./Router/profile');
const requestRoute=require("./Router/reuest")

app.use('/',authRouter);
app.use('/', profileRouter);
app.use('/', requestRoute)













connectdb()
.then(()=>{
    console.log("Database connected successfully ✈️ .....");
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777");
    })

}).catch(err=>{
    console.log("Database is not  connected 🤔 ....");
});
