const express = require("express");
const app = express();
const User=require("./models/user_data.js");
const bodyParser = require('body-parser');
const multer=require('multer');
const path=require('path')
const crypto = require('crypto');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.set("view engine" ,"ejs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,function(err,name){
        const fn  = name.toString("hex") + path.extname(file.originalname);      
      cb(null, fn);
    });
}
});
const upload = multer({ storage: storage })
  


app.get('/form',(req,res) =>{
    res.render("form");
});

app.get('/find',(req,res) =>{
  res.render("find");
});

app.post('/form', upload.single('image'),async (req,res) => {
    
    console.log(req.file);
    let {name,clas,email,rollno} = req.body;
    const user= await User.create({
        name,
        clas,
        email,
        rollno,
        picture: req.file.filename
    });
    const response = await user.save();
    // console.log(response);
    res.render("form",{user});
});

app.post('/find',async (req,res) => {
  let rollno =req.body.rollno;
  console.log(rollno);
  let user = await User.findOne({rollno});
  console.log(user);
  res.render("find",{user});
});

app.listen(3000);