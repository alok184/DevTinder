
// import the define the Schema
const mongoose=require('mongoose')
const validator=require('validator')
const jwt= require('jsonwebtoken')
const bcrypt=require("bcrypt")
const userSchema= new  mongoose.Schema({
    firtsName:{
        type:String,
        required:[true , 'firstName is required'],
        minLength: 4,
        maxLength:100,
        trim:true
    },
    lastName:{
        type:String,
        minLength: 4,
        maxLength:100,
        trim:true
    },
    age :{
        type:Number,
       
        trim:true
    },
    gender:{
        type:String,
        validate(value){
            if(!['male', 'female', 'other'].includes(value)){
                throw new Error('Gender data is not valid')
            }
        }
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
        required:[true, 'Email is Required'],
        unique:[true, "Email Id should be unique"],
    
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        trim:true,
        unique:[true,"password should be unique"]
      
    },
    about:{
        type:String,
        default:"About is by defult"
    },
    skills:{
        type:[String]
    },
    phoneNumber:{
     type:Number,
     match:[/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Please Enter a valid Mobile Number']
    },
    imageurl:{
        type:String,
        default:'https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg'

    }
},
{
    timestamps:true
});


// best way to write ---- or you can write direct in login  api
userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id}, "DevTinder@8786991" , {
            expiresIn:'1d'
        });
    return token;
};

// u can write for compare the bcrypt passowrd 
userSchema.methods.validatePassword=async function(passwordInputByUser){
 const user=this;
 const passowrdHash=user.password;
 const isPasswordValid = await bcrypt.compare(passwordInputByUser,passowrdHash);
 return isPasswordValid;
}

// create mongoose module
// const User= mongoose.model("user", userSchema);
// module.exports=User;

// or
module.exports=mongoose.model("User", userSchema)

