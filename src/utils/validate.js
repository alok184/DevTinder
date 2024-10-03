
const validator=require("validator")
const ValidateSingupData = (req)=>{
     const {firtsName, lastName,emailId, password }=req.body;
     if(!firtsName || !lastName){
        throw new Error("Name is not valid!")
     }else if(!validator.isEmail(emailId)){
        throw new Error("Please Enter a valid emialid.!")
     }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong password.!")
     }
};
module.exports={
    ValidateSingupData
}