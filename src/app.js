// Create server
const express=require('express'); // refreshing to express folder

// create new application of express
const app=express();  // we are createing a web server
app.get("/get", (req, res)=>{
   res.send("hello ji");
});

// how to handle the code
app.use("/test", (req, res) =>{
    res.send("Hello from the server")
})
// call listen here lsiten in some port that any one connect
app.listen(4000, ()=>{
    console.log("server is successfully listening on port");
})

