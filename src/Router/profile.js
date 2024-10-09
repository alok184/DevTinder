

const express=require('express')
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const {validateProfleEditData}=require("../utils/validate")
const bcrypt=require('bcrypt')
const User=require("../models/user");
// validatpr
const validator=require("validator")
// profile get the data and validate the token
profileRouter.get("/profile",userAuth,  async(req, res)=>{
    try{
         const user= req.user;
        res.send(user)
       
    }catch(err){
        res.status(404).send("Profile Not found")
    }
});


// Update profile
profileRouter.patch("/profile/edit" , userAuth, async(req, res)=>{
    try{
        if(!validateProfleEditData(req)){
            throw new Error("invalide edit data")
        }
        const loginuser=req.user;
        console.log("login", loginuser);
        // here Update the data like that if Update the first name
        // loginuser.firstName=req.body.firstName .... like that for all data
         // so here is solution for that
         Object.keys(req.body).forEach((fieldName)=>(loginuser[fieldName]=req.body[fieldName]));
         loginuser.save();
         res.send(`${loginuser.firtsName} your profile Updated successfully`)
        // or
        // res.json({message :`${loginuser.firtsName}: your profile Update Sucessfully`,
        // data:loginuser})
    }catch(err){
       res.status(404).send("Error" +err.message)
    }
});

//update passowrd
profileRouter.patch("/updatePassword", userAuth, async (req, res) => {

    try {
        const { currentPassword, newPassword } = req.body;
        // Check if both current and new password are provided
        if (!currentPassword || !newPassword) {
            throw new Error("Both current password and new password are required.");
        }
        if(!validator.isStrongPassword(currentPassword)){
            throw new Error("Please Enter the strong current passowrd")
        }
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("please enter the strong new passowrd")
        }
        // Access the logged-in user correctly
        const loginuser = req.user;
        // Validate the current password
        const isValid = await loginuser.validatePassword(currentPassword);
        if (!isValid) {
            throw new Error("Invalid current password.");
        }
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        loginuser.password = hashedNewPassword;
        // Save the updated user instance
        await loginuser.save();
        // Send success response
        res.send("Password updated successfully.");
    } catch (err) {
        // Send detailed error message for debugging
        res.status(400).send("Error: " + err.message);
    }
});

module.exports=profileRouter;