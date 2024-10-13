const mongoose=require("mongoose")
const conectionRequestSchema= new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    touserId:{
       type: mongoose.Schema.ObjectId,
       require:true
    },
   
    status:{
        type:String,
        trim:true,
        require:true,
        enum:['Ignored','Interested', 'Accepted', 'Rejected']
        
    }
}, {
    timestamps:true
});
// compound index means combine the two query Make query very fast and optimze the db 
// 1 means acces and -1 desc
conectionRequestSchema.index({fromuserId:1, touserId:1})

// user can't send the selt request validation
conectionRequestSchema.pre('save', function(next){
    // check if the fromuserId is same as toUserId
    const connectionRequest=this;
    if(connectionRequest.fromuserId.equals(connectionRequest.touserId)){
        throw new Error("Can't send the request to your self.!")
    }
    next();

})


module.exports=mongoose.model("conectionRequest", conectionRequestSchema)
