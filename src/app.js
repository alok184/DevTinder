// Create server
const express=require('express'); // refreshing to express folder

// create new application of express
const app=express();  // we are createing a web server


// app.use("/", (req, res)=>{
//     res.send("hello ji");
// });

// app.get("/get", (req, res)=>{
//    res.send("hello ji");
// });

// // how to handle the code
// this will match all  the http method api call to /test
// app.use("/test", (req, res) =>{
//     res.send("Hello from the server")
// })

// app.use("/", (req, res)=>{
//     res.send("hello ji");
// });

// handle get and post call separation

// This will only handle get call to /user

app.get("/user", (req, res)=>{
    res.send("get method");
} );

app.post("/postmethod", (req, res)=>{
    console.log("post method");
    res.send("post method")
});
app.delete("/deletedata", (req, res)=>{
    res.send("dellete user data")
});







// call listen here lsiten in some port that any one connect
app.listen(4000, ()=>{
    console.log("server is successfully listening on port");
})

