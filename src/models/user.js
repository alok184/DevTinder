
// import the define the Schema
const mongoose=require('mongoose')

const userSchema= new  mongoose.Schema({
    firtsName:{
        type:String
    },
    lastName:{
        type:String
    },
    age :{
        type:Number
    },
    gender:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    }
})
// create mongoose module
// const User= mongoose.model("user", userSchema);
// module.exports=User;

// or
module.exports=mongoose.model("User", userSchema)

