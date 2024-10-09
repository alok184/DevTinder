const express=require('express')
//  extract the validation for singup 
const {ValidateSingupData}=require("../utils/validate");
// extract the bcrypt
const bcrypt=require('bcrypt');
// Create Router 
const authRouter=express.Router();
// validatpr
const validator=require("validator")
const User=require("../models/user");
// make the api dyamics --------------------
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res)=>{
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


// Logout api
authRouter.post("/logout", async(req, res)=>{
  res.cookie('token' , null , {expires:new Date(Date.now())})
  res.send("Logout Scessfully .!!")
})


module.exports=authRouter;