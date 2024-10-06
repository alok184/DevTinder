const express=require('express');
// required database file
const connectdb=  require("./config/database");
const app=express(); 
 const User=require("./models/user");
//  add middleware express to recived the data in json and save to js object
 app.use(express.json());
//  extract the validation for singup 
const {ValidateSingupData}=require("./utils/validate");
// extract the bcrypt
const bcrypt=require('bcrypt');
// middleware of cookien
const cookiesParser= require("cookie-parser")
app.use(cookiesParser());
// import jwt token (extract)
const jwt=require('jsonwebtoken')
// import authUser 
const {userAuth}=require("./middlewares/auth")
// validatpr
const validator=require("validator")

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

// make the api dyamics --------------------
app.post("/signup", async (req, res) => {
    // Best way to handle the error
    try { 
        /// extract the passowrd
        const{firtsName,lastName,emailId, password}=req.body;
        // validate the data -----
        ValidateSingupData(req)
        // bcrypt the passowrd ----
        const hashPassword =  await  bcrypt.hash(password, 10)
        console.log(hashPassword);
         // Create a new instance of the User model with the request body
            // const user = new User(req.body);
            // or best way to extract 
            const user=new User({
                firtsName,
                lastName,
                emailId,
                password:hashPassword
            });
        await user.save(); // Save the user to the database
        res.status(201).send("Signup has been done successfully"); // Send success response
    } catch (err) {
        res.status(401).send("Error :" +err.message); // Send error response with detailed message
    }
});

// login api ----
app.post("/login", async (req, res)=>{
   try{
      // extract the userName, and password
      const{emailId, password}=req.body;
       if(!validator.isEmail(emailId)){
        throw new Error("Email Id is Invalid")
       }
      const user= await User.findOne({emailId:emailId});
      console.log("here user ", user);
      if(!user){
        throw new Error("invalid credentails")
      }
      // check password also
      if(!validator.isStrongPassword(password)){
        throw new Error("Plese Enter a strong password")
      }
      console.log("user password", user.password);
   
    //   const isPasswordValid = await bcrypt.compare(password, user.password);
    // 2nd way  write the code in user schema
    const isPasswordValid=await user.validatePassword(password);
      if(isPasswordValid){
        // if password is valide
        // create A jwt token
        // here user expire token time 
        // best way to write this in user schema 
        // const token=await jwt.sign({_id:user._id}, "DevTinder@8786991" , {
        //     expiresIn:'1d'
        // });
        // console.log(token);
          // this one is the 2nd way write code in userSchema
            const token=await user.getJWT();
        // Add the token to cookies and send the response back to user and here set the expire cookies in 1 day
         res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        res.send("Login successfully")
      }else{
        res.status(404).send("invalid credentails")
      }
   }
   catch(err){
    res.status(404).send("Error:" +err.message)
   }
});
// profile get the data and validate the token
app.get("/profile",userAuth,  async(req, res)=>{
    try{
         const user= req.user;
        res.send(user)
       
    }catch(err){
        res.status(404).send("Profile Not found")
    }
 
});
// dummy api for connection request
app.get("/connectedApi",userAuth, async(req, res)=>{
    try{
        const user=req.user;
         console.log("connect ", user.firtsName);
         res.send("connected successfully userName is " + user.firtsName)
    }
    catch(err){
        res.status(404).send("something wents worn")
    }
})
// get the data by emailid -------------------
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
// delete user ----------------------
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

// Update api (user Update by id) ------------
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

// Update Update by emailid ------------------
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
