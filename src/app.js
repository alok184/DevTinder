const express=require('express');
const app=express(); 

app.use("/use", (req, res)=>{
    res.send("route handler1")
});

// one route can handle Multiple handler.
app.use("/user1", (req, res, next)=>{
    console.log("1st reponse");
    next();
    res.send("handle route1")

},
 (req, res, next)=>{
     console.log("2nd Reponse");
     next();
    res.send("2nd reponse !!!")
   
},
[ (req, res, next)=>{
  console.log("3rd response");
  next();
    res.send("3nd reponse !!!")
}], 
(req, res, next)=>{
   console.log("4th response");
   next();
    res.send("4nd reponse !!!")
},
 (req, res, next)=>{
     console.log("5th response");
     next();
    res.send("5nd reponse !!!")
}, 
(req, res, next)=>{
     console.log("6th response");

    res.send("6nd reponse !!!")

}

);

app.use("/user2", (req,res, next)=>{
    next()
    res.send("user2 route")
   
}, (req, res, next)=>{
   next()
    res.send("route handler2")
})











app.listen(4000, ()=>{
    console.log("server is successfully listening on port");
})