const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
console.log("DataBase connected");
const userSchema = mongoose.Schema({
    rollno:String,
    picture:{
        type:String        
    }
});

module.exports= mongoose.model("user_data",userSchema);
