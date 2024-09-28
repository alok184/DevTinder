const mongoose=require('mongoose')
// connect to data base
// use ayns awit
const connectdb=async  ()=>{
   await mongoose.connect(
   "mongodb+srv://alokkumar41558:dJY2IBRXBiPfWvDV@namstenode.4yk3e.mongodb.net/devTinder"
      
    );
};
module.exports = connectdb;

