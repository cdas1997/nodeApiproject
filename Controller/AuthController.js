
const AuthModel=require('../Model/Auth_Model');
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');


exports.postUserValueRegistration=(req,res)=>{


    const Ufname=req.body.firstname;
    const Ulname=req.body.lastname;
    const Uemail=req.body.email;
    const Upassword=req.body.password;

   
console.log(Ufname,Ulname,Uemail,Upassword);
if(!Ufname)
{
    return res.status(401).json({
        success:false,
        message:"first name is required"

    })
}
else if(!Ulname)
{
    return res.status(401).json({
        success:false,
        message:"last name is required"

    })
}
else if(!Uemail)
{
    return res.status(401).json({
        success:false,
        message:"email is required"

    })
}
else if(!Upassword)
{
    return res.status(401).json({
        success:false,
        message:"password is required"

    })
}

else{
    
  AuthModel.findOne({Useremail:Uemail})
  .then(userValue=>{
      if(userValue)
      {
        //   console.log("email already exists",userValue);
        //   req.flash('error','ERROR :: Email Already Exists...Please Try With New One!');
          return res.status(401).json({
            success:false,
            message:"Email Already Exists"
    
        })
      }

      return bcrypt.hash(Upassword,12)
      .then(hashPassword=>{
          const userData=new AuthModel({Userfname:Ufname,Userlname:Ulname,Useremail:Uemail,Userpassword:hashPassword})
          return userData.save()
      }).then(results=>{
        //   console.log("registration done");
          
        //   return res.redirect('/Login');
        return res.status(201).json({
            success:true,
            message:"Registration Successful",
            result:results
    
        })
      }).catch(err=>{
        //   console.log(err);
        return res.status(401).json({
            success:false,
            message:err
    
        })
      })
  }).catch(err=>{
    //   console.log("error in finOne",err);
    return res.status(401).json({
        success:false,
        message:err

    })
      })
}
   }
;



    exports.postUserValueLogin=(req,res)=>{

    const Uemail=req.body.email;
    const Upassword=req.body.password;
    const checked=req.body.checked;
console.log(Uemail,Upassword);
if(!Uemail)
{
    return res.status(401).json({
        success:false,
        message:"email is required"

    })
}
else if(!Upassword)
{
    return res.status(401).json({
        success:false,
        message:"password is required"

    })
}
else{
    AuthModel.findOne({Useremail:Uemail})
    .then(userValue=>{
        if(!userValue)
        {
            return res.status(401).json({
                success:false,
                message:"invalid Email"
        
            })
        }
  
        bcrypt.compare(Upassword,userValue.Userpassword)
        .then(result=>{
          
      if(!result)
      {
        return res.status(401).json({
            success:false,
            message:"invalid password"
    
        })
      }
      else
      {
  
          console.log("Logged in",result);
        
          req.session.isLoggedIn=true;
          req.session.user=userValue;
         
          return req.session.save(err=>{
              if(err)
            {
                console.log(err);
            }
            else
            {
                const token_jwt=jwt.sign({Useremail:userValue.email},"ABCD",{expiresIn:'1h'});
                return res.status(201).json({
                    success:true,
                    message:"Login successful",
                    result:userValue,
                    token:token_jwt
            })
          }})

        }
      return res.status(201).json({
        success:true,
        message:"Login"

    })
        }).catch(err=>{
            return res.status(401).json({
                success:false,
                message:err
        
            })
        })
    }).catch(err=>{
        return res.status(401).json({
            success:false,
            message:err
    
        })
        })
}
 
  }
        
        ;


        // exports.getLogout=(req,res)=>{
      
        //     res.status(200).clearCookie('connect.sid',{path:'/'});
        //    req.session.destroy();
        //     return res.redirect('/Login');
            
          
        //     };

