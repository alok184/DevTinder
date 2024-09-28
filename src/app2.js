const express=require('express');
const app=express(); 
// import middleware auth
const {AdminAuth, userAuth}=require('./middlewares/auth');

// app.use("/use", (req, res)=>{
//     res.send("route handler1")
// });

// one route can handle Multiple handler.
// app.use("/user1", (req, res, next)=>{
//     console.log("1st reponse");
//     next();
//     res.send("handle route1")

// },
//  (req, res, next)=>{
//      console.log("2nd Reponse");
//      next();
//     res.send("2nd reponse !!!")
   
// },
// [ (req, res, next)=>{
//   console.log("3rd response");
//   next();
//     res.send("3nd reponse !!!")
// }], 
// (req, res, next)=>{
//    console.log("4th response");
//    next();
//     res.send("4nd reponse !!!")
// },
//  (req, res, next)=>{
//      console.log("5th response");
//      next();
//     res.send("5nd reponse !!!")
// }, 
// (req, res, next)=>{
//      console.log("6th response");

//     res.send("6nd reponse !!!")

// }
// );

// how express js application work.

// Get/users=>it's check all the app.xxx("matching route") functions 
// middleware chain => request handler

// another way to define route handler

// app.use('/user2', (req, res, next)=>{
//     console.log("handle the route user 1 !!!");
//     next();
//     // res.send("handle rouet handle 1")
// }, (req, res, next)=>{
//     console.log("handler");
// },
// (req, res, next)=>{   
//     console.log("handler");    // these all are middlewares
// },  (req, res, next)=>{
//     console.log("handler");
// })
// app.use('/user2', (req, res, next)=>{
//     console.log("handle the route user 2 !!!");
//     next();
//     res.send("route handle 2")
    
// })


// why middleware need (how it's work) --------


// Handle Auth middleware for all request GET, POST, PUT, and DELETE
// this middleware call for only ("/admin")
// app.use('/admin', (req, res, next)=>{
//     console.log("Admin auth is getting checked !!");
//     const token="xyz";
//     const isAdminAuthorized=token==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request")
//     }else{
//         next();
//     }
// });
// 2nd clean way write this code in another file
// pass for all auth /admin
app.use("/admin", AdminAuth);
app.use("/user", userAuth);

app.get("/admin/getdata", (req, res)=>{ 
    // check if the request is authorized (check the anyone can't access the api)
    // logic of checking authorized or not
//     const token="xyzsaddsad";
//     const adminAuth=token==="xyz";
//   if(adminAuth){
    res.send("All data sent")
//   }else {
//     res.status(401).send("UnAuthorized Admin")
//   }
  // this same logic write for /admin/deletedData (API) (we should not write the same logic multiple time. for slove this problem  we are using middleware)

})

app.get("/admin/deletedData", (req, res)=>{
    // user
    res.send("deleted a user");
    
})

// user login doesn't need auth
app.post("/user/login", (req, res)=>{
    res.send("user login successfully")
})

// error handlers;
app.get('/getuserdata', (req, res)=>{
    // write some logic for db call and get user data what if some error with the code
    // what if some error
    // this is good ways
    try{
        throw new Error("hkwekhewke")
        res.send("user data")
    }catch(err){
        res.status(500).send("some error")
    }
     
});
app.use("/", (err, req, res, next) => {
    if(err){
        // log your error 
        res.status(500).send("Something went wrong");
    }
   
});





app.listen(4000, ()=>{
    console.log("server is successfully listening on port");
})