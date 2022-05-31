require('dotenv').config();

const express=require('express');
const appServer=express();

const cors=require('cors');

const path=require('path');

const AuthModel=require('./Model/Auth_Model');

const session=require('express-session');
const mongodb_session=require('connect-mongodb-session')(session);

const storeValue=new mongodb_session({
    uri:'mongodb+srv://chandan9051:chandan1234@cluster0.413hj.mongodb.net/MongooseProject',
    collection:'user_session'
});

const multer=require('multer');
const flash=require('connect-flash');
// const csurf=require('csurf');
const cookieparser=require('cookie-parser');


const home_routing=require('./Router/HomeRouter');
const admin_routing=require('./Router/AdminRouter');
const user_routing=require('./Router/UserRouter');
const auth_routing=require('./Router/AuthRouter');
const cart_routing=require('./Router/CartRouter');

const mongoose=require('mongoose');
const res = require('express/lib/response');
// let db_url="mongodb+srv://chandan9051:chandan1234@cluster0.413hj.mongodb.net/MongooseProject?retryWrites=true&w=majority";

const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'UploadImage')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
});    //To use image folder after using it in database


const fileFilter=(req,file,callback)=>{
    if(file.mimetype.includes("png")||
      file.mimetype.includes("jpg")||
      file.mimetype.includes("jpeg")||
      file.mimetype.includes("avif")||
      file.mimetype.includes("webp"))
      {
          callback(null,true)
      }
      else
      {
          callback(null,false)
      }
}   //file.mimetype is used to set the image type which to be accepted 

// const csurfProtection=csurf();

appServer.use(cookieparser());
appServer.use(flash());

appServer.use('/UploadImage',express.static(path.join(__dirname,'UploadImage')));  //To Store images




appServer.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('productimg')); 
// to upload image in database
// productimage is the inputfield name for image in addproduct

appServer.use(session({secret:'secret-key',resave:false,saveUninitialized:false,store:storeValue}))

appServer.use(express.urlencoded());



appServer.set("view engine","ejs");
appServer.set("views","View");
appServer.use(express.static(path.join(__dirname,'Public')));



appServer.use((req,res,next)=>
{
    res.setHeader('Access-Control-Aloow-Origin','*');
    res.setHeader('Access-Control-Aloow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Aloow-Headers','Content-type,Authoraization');
    next();
});
appServer.use(cors());

appServer.use((req,res,next)=>{
    if(!req.session.user)
    {
        return next();
    }
    AuthModel.findById(req.session.user._id)
    .then(userValue=>{
        req.user=userValue;
        console.log("user details",req.user);
        next();
    })
    .catch(err=>{
        console.log("user not found",err);
    })
});

// appServer.use(csurfProtection);





// csurf always import and use after session and cookie parser

// appServer.use((req,res,next)=>{
//     res.locals.isAuthenticated=req.session.isLoggedIn;
//     res.locals.csrf_token=req.csrfToken();
//     next();
// })


appServer.use(home_routing);
appServer.use(admin_routing);
appServer.use(user_routing);
appServer.use(auth_routing);
appServer.use(cart_routing);
appServer.use((req,res)=>{
    res.send('<h1>not found</h1>');
})




mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{console.log("Database is connected..",result);
appServer.listen(process.env.PORT ||4005,()=>{
            console.log("server is connected at port 4005....");
        })
})

