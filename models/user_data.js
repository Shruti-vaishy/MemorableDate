const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shrutivaishy610:Kushagra2107@cluster0.6bxwfsi.mongodb.net/practice_backend");
console.log("DataBase connected");
const userSchema = mongoose.Schema({
    name:String,
    clas:String,
    email:String,
    rollno:String,
    picture:{
        type:String        
    }
});

module.exports= mongoose.model("user_data",userSchema);
