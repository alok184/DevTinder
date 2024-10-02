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
app.delete("/deleteuserbyId", async(req, res)=>{
    const userId=req.body.userId;
    try{
        const deleteuserbyid=await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
    }
    catch(err){
        res.status(404).send("something went wrong")
    }
});

// Update api (user Update by id)
app.patch("/updateuserById/:userId", async (req, res) => {
    const userId = req.params?.userId; // Get userId from route params
    const data = req.body; // Data to update

    try {
        // Allowed fields for update
        const Allow_UserData = [ "age", "gender", "about", "imageurl", "phoneNumber", "skills"];
        
        // Validate if all provided fields are allowed
        const isAllowUsertoUpdate = Object.keys(data).every((k) => Allow_UserData.includes(k));
        if (!isAllowUsertoUpdate) {
            throw new Error("Update not allowed for some fields");
        }

        // Validate if 'skills' array has more than 10 elements
        if (data.skills && data.skills.length > 10) {
            throw new Error("Skills can't be more than 10");
        }

        // Update user data by userId
        const UpdateData = await User.findByIdAndUpdate(userId, data, {
            returnDocument: 'after', // Return the updated document
            runValidators: true // Apply schema validators during update
        });

        // If user not found
        if (!UpdateData) {
            return res.status(404).send("User not found");
        }

        // Send success response
        res.send("User data updated successfully ✈️");
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).send({ error: err.message }); // Send detailed error message
    }
});




// Update Update by emailid
app.patch("/updatedByEmailId", async (req, res) => {
    const emailId = req.body.emailId;
    const data = req.body;
    try {
        console.log("Email ID:", emailId); // Debugging logs
        console.log("Data to update:", data);

        // Using findOneAndUpdate to update by emailId
        const updatedUser = await User.findOneAndUpdate({ emailId: emailId }, data);
        res.send("User updated successfully");
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Something went wrong");
    }
});









connectdb()
.then(()=>{
    console.log("Database connected successfully ✈️ .....");
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777");
    })

}).catch(err=>{
    console.log("Database is not  connected 🤔 ....");
});
