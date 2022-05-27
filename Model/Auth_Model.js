const mongoose=require('mongoose');
const SchemaVariable=mongoose.Schema;

const AuthSchema=new SchemaVariable({
    Userfname:{
   type:String,
   required:true
    },
    Userlname:{
        type:String,
        required:true
    },
    Useremail:{
        type:String,
        required:true
    },
    Userpassword:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('User',AuthSchema);