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

// advance routing
//it's will work /ac, /abc 
app.get("/ab?c", (req, res)=>{
    res.send("advance route re baba");
});
// as many c we can write like xyyyyz route will work but u can't write abcddd or abbcd , or like that

app.get("/xy+z", (req, res)=>{
    res.send("advance route re baba");
});

// here bc is optional  ad, abcd all work not work acd
app.get('/a(bc)?d', (req, res)=>{
    res.send("here optional route")
})

/// red the query parma
// set dyamics params
//dymaics route
app.get("/user1/:userid/:name", (req, res)=>{
    console.log(req.params);
    res.send({firstName : "Alok", lastName:"Kumar"})
})






// call listen here lsiten in some port that any one connect
app.listen(4000, ()=>{
    console.log("server is successfully listening on port");
})

